import React from "react";

export default function UserPlanCard(props) {
  const plan = props.plan;
  return (
    <section className="UserPlanCard">
      <img className="UserPlan-logo" src={plan.logoURL} />
      <div className="UserPlan-specs">
        <p className="UserPlan-name">{plan.name}</p>
        <p className="UserPlan-Provider">{plan.provider}</p>
        <div className="UserPlan-featurBox">
          <h6>Duration</h6>
          <p>{plan.duration}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Refund Policy</h6>
          <p>{plan.refundPolicy}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <p className="UserPlan-desc">{plan.description}</p>
        <div className="UserPlan-featurBox">
          <h6>Activation date</h6>
          <p>{plan.activationDate}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Expires on</h6>
          <p>{plan.ExpireDate}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <div className="UserPlan-rate">
          <h6>Rate this provider</h6>
          <p>{plan.rateAmmount}</p>
          <p>{plan.rateNumber}</p>
        </div>
        <div className="UsePlanPercentage"></div>
        <p className="UsePlan-useAnnounce">
          You have used {plan.usePercentage} of the service Refundable amount: {plan.refundAmmount}
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
