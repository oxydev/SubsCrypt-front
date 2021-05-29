import React from "react";
import localData from "../../../data/sunscryptionPlans.json";
import * as utils from "../../../utilities/utilityFunctions";

export default function UserPlanCard(props) {
  const plan = props.plan.plan;
  const index = props.index;
  const localPlans = localData.userPlans[index];

  return (
    <section className="UserPlanCard">
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
          <button className="UserPlan-refundBtn" onClick={() => {}}>
            Refund
          </button>
          <button className="UserPlan-renewBtn" onClick={() => {}}>
            Renew
          </button>
        </div>
      </div>
    </section>
  );
}
