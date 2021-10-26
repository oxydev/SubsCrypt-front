import React, { useState, useContext, useEffect } from "react";
import localData from "../../data/sunscryptionPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import { UserContext } from "../../context/store";
import { setDataContext } from "../../context/setData";
import PercentageBar from "../gadjets/percentageBar";
import { operationContext } from "../../context/handleUserOperation";
import tutData from '../../data/tutorial.json'
import { tutorialContext } from '../../context/tutorial'
import { handleDataContext } from '../../context/handleData'

let subscrypt;

//The component for generating a plan card which user has
export default function UserPlanCard(props) {
  let plan = props.plan.plan;
  // console.log(props.plan);
  const index = props.index;
  const localPlans = localData.userPlans[index];
  const { globalState } = useContext(UserContext);
  const { handleSubscriberLoginByWallet } = useContext(handleDataContext);
  const { handleSubscribtion, handleRenewPlan, handleRefundPlan } = useContext(setDataContext);
  const planStatus = props.plan.status;
  const walletAddress = globalState.user.wallet;
  const [localLoading, setLocalLoading] = useState(false);
  const { showResultToUser } = useContext(operationContext);
  const tutorialData = tutData.tutorials.subscriberWithPlan;
  const { handleTutorial } = useContext(tutorialContext);

  useEffect(() => {
    handleTutorial(tutorialData);
  }, []);
  //plan amounts
  const usedPercentage = utils.usePercentage(
    parseInt(props.plan.subscription_time.replace(/,/g, "")),
    parseInt(plan.duration.replace(/,/g, ""))
  );

  const refundPolicy = plan.max_refund_permille_policy.replace(/,/g, "") / 10;

  const price = parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12);
  const remianPercentage = 100 - usedPercentage;

  const possibleRefund = Math.min(refundPolicy, remianPercentage);
  const refundAmount = (price * possibleRefund) / 100;
  // console.log(refundAmount);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  });

  //Get plan charactrisics
  async function getCharacs() {
    await (await subscrypt)
      .getPlanCharacteristics(props.plan.provider, props.plan.plan_index)
      .then((result) => {
        // console.log(result);
        if (result.status === "Fetched") {
          plan.characteristics = result.result;
          handleSubscribtion(props.plan.provider, plan, props.plan.plan_index, callback).catch(
            async () => {
              await showResultToUser("Operation faild!", "The operation has been failed!");
            }
          );
          setLocalLoading(false);
        }
      });
  }

  //Subscription function
  function handleSubscribe() {
    setLocalLoading(true);
    // console.log(walletAddress);
    getCharacs();
  }

  //Refunding function
  function handleRefund() {
    handleRefundPlan(props.plan.provider, plan, props.plan.plan_index, callback).catch(async () => {
      await showResultToUser("Operation faild!", "The operation has been failed!");
    });
  }

  //Renew function
  function handleRenew() {
    // console.log(props.plan);
    handleRenewPlan(props.plan.provider, props.plan, props.plan.plan_index, callback).catch(
      async () => {
        await showResultToUser("Operation faild!", "The operation has been failed!");
      }
    );
  }

  //callback function
  async function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      for (const { event: { data, method, section }, phase } of events) {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          // window.alert("The operation has been done successfully");
          await showResultToUser(
            "Operation Successful!",
            "The operation has been done successfully"
          );
        }
      }
      if (check === false) {
        // window.alert("The operation failed!");
        await showResultToUser("Operation failed!", "The operation has been failed!");
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      handleSubscriberLoginByWallet(globalState.user.address);
    }
  }

  return (
    <section id={"plan"+index+"Detail"}
      className={
        planStatus === -1
          ? "UserPlanCard expired"
          : planStatus > 90
          ? "UserPlanCard warning"
          : "UserPlanCard"
      }
    >
      <img
        className="UserPlan-logo"
        src={"https://api.subscrypt.io/profile/getProviderPic/" + props.plan.provider}
      />
      <div className="UserPlan-specs">
        <p className="UserPlan-name">{props.plan.name ? props.plan.name : "Loading..."}</p>
        <p className="UserPlan-Provider">
          {props.plan.providerName ? props.plan.providerName : "Loading..."}
        </p>
        <div className="UserPlan-featurBox">
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Refund Policy</h6>
          <p>{"% " + refundPolicy + " Refund"}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <p className="UserPlan-desc">{props.plan.description}</p>
        <div className="UserPlan-featurBox">
          <h6>Activation date</h6>
          <p>{utils.timeStamptoDate(parseInt(props.plan.subscription_time.replace(/,/g, "")))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Expires on</h6>
          <p>
            {utils.timeStamptoDate(
              parseInt(props.plan.subscription_time.replace(/,/g, "")) +
                parseInt(plan.duration.replace(/,/g, ""))
            )}
          </p>
        </div>
      </div>
      <div className="UserPlan-specs">
        {/*<div className="UserPlan-rate">*/}
        {/*  <h6>Rate this provider</h6>*/}
        {/*  <p>{localPlans.rateAmmount} rates </p>*/}
        {/*  /!* <p>{localPlans.rateNumber}</p> *!/*/}
        {/*</div>*/}
        <div className="UsePlanPercentage">
          <PercentageBar percentage={usedPercentage} />
        </div>

        <p className="UsePlan-useAnnounce">You have used {"%" + usedPercentage} of the service</p>
        {planStatus !== -1 && (
          <p className="UsePlan-useAnnounce">Refundable amount: {refundAmount} Dot</p>
        )}

        <div className="UserPlan-PayPart">
          <div className="UserPlan-payMethod">
            <label>Pay with</label>
            <select className="UserPlan-coinSelect">
              <option value="coin1">coin1</option>
              <option value="coin2">coin2</option>
            </select>
          </div>
          {planStatus === -1 ? (
            <>
              <button
                className={localLoading ? "UserPlan-subscribeBtn loading" : "UserPlan-subscribeBtn"}
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </>
          ) : (
            <>
              <button id={"plan"+index+"Refund"}  className="UserPlan-refundBtn" onClick={handleRefund}>
                Refund
              </button>
              <button id={"plan"+index+"Renew"} className="UserPlan-renewBtn" onClick={handleRenew}>
                Renew
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
