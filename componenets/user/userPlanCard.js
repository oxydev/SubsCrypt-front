import React, { useState, useContext } from "react";
import localData from "../../data/sunscryptionPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import PercentageBar from "../gadjets/percentageBar";

const subscrypt = import("@oxydev/subscrypt");

//The component for generating a plan card which user has
export default function UserPlanCard(props) {
  let plan = props.plan.plan;
  const index = props.index;
  const localPlans = localData.userPlans[index];
  const { globalState } = useContext(UserContext);
  const { handleSubscribtion, handleRenewPlan, handleRefundPlan } = useContext(dataContext);
  const status = props.plan.status;
  const walletAddress = globalState.user.userWallet;
  const [localLoading, setLocalLoading] = useState(false);

  //plan amounts
  const usedPercentage = utils.usePercentage(
    parseInt(props.plan.subscription_time.replace(/,/g, "")),
    parseInt(plan.duration.replace(/,/g, ""))
  );

  //Get plan charactrisics
  async function getCharacs() {
    await (await subscrypt)
      .getPlanCharacteristics(props.plan.provider, props.plan.plan_index)
      .then((result) => {
        // console.log(result);
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          handleSubscribtion(props.plan.provider, plan, props.plan.plan_index, callback);
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
    handleRefundPlan(props.plan.provider, plan, props.plan.plan_index, callback);
  }

  //Renew function
  function handleRenew() {
    console.log(props.plan);
    handleRenewPlan(props.plan.provider, props.plan, props.plan.plan_index, callback);
  }

  //callback function
  function callback({ events = [], status }) {
    console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      console.log("Included at block hash", status.asInBlock.toHex());
      console.log("Events:");
      console.log(events);
      let check = false;
      events.forEach(({ event: { data, method, section }, phase }) => {
        console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          window.alert("The operation has been done successfully");
        }
      });
      if (check == false) {
        window.alert("The operation failed!");
      }
    } else if (status.isFinalized) {
      console.log("Finalized block hash", status.asFinalized.toHex());
    }
  }

  return (
    <section
      className={
        status == -1
          ? "UserPlanCard expired"
          : status > 90
          ? "UserPlanCard warning"
          : "UserPlanCard"
      }
    >
      <img className="UserPlan-logo" src={props.plan.image} />
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
          <p>{"% " + plan.max_refund_permille_policy / 10 + " Refund"}</p>
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
        <div className="UserPlan-rate">
          <h6>Rate this provider</h6>
          <p>{localPlans.rateAmmount} rates </p>
          {/* <p>{localPlans.rateNumber}</p> */}
        </div>
        <div className="UsePlanPercentage">
          <PercentageBar percentage={usedPercentage} />
        </div>
        <p className="UsePlan-useAnnounce">
          You have used {"%" + usedPercentage} of the service Refundable amount:{" "}
          {plan.refundAmmount}
        </p>
        <div className="UserPlan-PayPart">
          <div className="UserPlan-payMethod">
            <label>Pay with</label>
            <select className="UserPlan-coinSelect">
              <option value="coin1">coin1</option>
              <option value="coin2">coin2</option>
            </select>
          </div>
          {status == -1 ? (
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
              <button className="UserPlan-refundBtn" onClick={handleRefund}>
                Refund
              </button>
              <button className="UserPlan-renewBtn" onClick={handleRenew}>
                Renew
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
