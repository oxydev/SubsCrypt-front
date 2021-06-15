import React, { useState, useContext } from "react";
import localData from "../../../data/sunscryptionPlans.json";
import * as utils from "../../../utilities/utilityFunctions";
import {
  getWalletInjector,
  refundPlan,
  renewPlan,
  connectToWallet,
} from "../../../dataFunctions/publicDataFunctions";
import { UserContext } from "../../../context/store";
import { authContext } from "../../../pages/_app";
import { modalContext } from "../../../context/modal";
import data from "../../../data/testData/providerAddress.json";
import SubscriptionModal from "./subscriptionModal";

const subscrypt = import("@oxydev/subscrypt");

export default function UserPlanCard(props) {
  let plan = props.plan.plan;
  const index = props.index;
  const localPlans = localData.userPlans[index];
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);
  const { modal, setModal } = useContext(modalContext);
  const status = props.plan.status;
  const walletAddress = globalState.user.userWallet;
  const providerAddress = data.providerAddress;
  const [localLoading, setLocalLoading] = useState(false);

  //Get plan charactrisics
  async function getCharacs() {
    console.log(props.plan.providerAddress, props.plan.planIndex);
    await (await subscrypt)
      .getPlanCharacteristics(props.plan.provider, props.plan.plan_index)
      .then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          let modalElement = <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} />;
          setModal(modalElement);
          setLocalLoading(false);
        }
      });
  }

  async function handleRefund() {
    await connectToWallet([], "user", dispatch, setAuth);
    refundPlan(
      globalState.wallets[1].address,
      getWalletInjector(globalState.wallets[1]),
      callback,
      providerAddress,
      0
    );
  }

  //Submit function for Subscription modal
  function handelModalSubmit(e, formData) {
    e.preventDefault();
    setModal(null);
    console.log(formData);
  }

  //Subscription function
  function handleSubscribe() {
    setLocalLoading(true);
    console.log(walletAddress);
    getCharacs();
    // password
    // username
    // subscribePlan(
    //   walletAddress.address,
    //   getWalletInjector(walletAddress),
    //   callback,
    //   providerAddress,
    //   planIndex
    // );
  }

  async function handleRenew() {
    await connectToWallet([], "user", dispatch, setAuth);
    renewPlan(
      globalState.wallets[1].address,
      getWalletInjector(globalState.wallets[1]),
      callback,
      providerAddress,
      0,
      ["value1"]
    );
  }

  function callback({ events = [], status }) {
    console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      console.log("Included at block hash", status.asInBlock.toHex());
      console.log("Events:");
      console.log(events);
      events.forEach(({ event: { data, method, section }, phase }) => {
        console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
      });
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
      <img className="UserPlan-logo" src={localPlans.logoURL} />
      <div className="UserPlan-specs">
        <p className="UserPlan-name">{localPlans.name}</p>
        <p className="UserPlan-Provider">{localPlans.provider}</p>
        <div className="UserPlan-featurBox">
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Refund Policy</h6>
          <p>{"% " + plan.max_refund_permille_policy + " Refund"}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <p className="UserPlan-desc">{localPlans.description}</p>
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
          <p>{localPlans.rateAmmount}</p>
          <p>{localPlans.rateNumber}</p>
        </div>
        <div className="UsePlanPercentage"></div>
        <p className="UsePlan-useAnnounce">
          You have used{" "}
          {"%" +
            utils.usePercentage(
              parseInt(props.plan.subscription_time.replace(/,/g, "")),
              parseInt(plan.duration.replace(/,/g, ""))
            )}{" "}
          of the service Refundable amount: {plan.refundAmmount}
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
