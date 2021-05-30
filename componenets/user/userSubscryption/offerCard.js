import React from "react";
import localData from "../../../data/providerPlans.json";
import * as utils from "../../../utilities/utilityFunctions";

export default function OfferCard(props) {
  const plan = props.offer;
  const index = props.index;
  const localPlans = localData.plans[index];
  const planIndex = plan.planIndex;

  function handleSubscribe() {
    console.log(planIndex);
  }

  return (
    <section className="OfferCard" onClick={handleSubscribe}>
      <header>
        <img className="OfferLogo" src={localPlans.logoURL} />
        <h1>{localPlans.name}</h1>
      </header>
      <main>
        <div>
          <p className="OfferCard-Provider">{localPlans.provider}</p>
          <p className="OfferCard-Rate">{localPlans.rate}</p>
        </div>
        <p className="OfferCard-description">{localPlans.description}</p>
        <div>
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div>
          <h6>Refund Policy</h6>
          <p>{"% " + plan.max_refund_permille_policy + " Refund"}</p>
        </div>
      </main>
      <footer>
        <div className="OfferCard-payMethod">
          <label>Pay with</label>
          <select className="OfferCard-coinSelect">
            <option value="coin1">coin1</option>
            <option value="coin2">coin2</option>
          </select>
        </div>
        <button className="OfferCard-payBtn" onClick={() => {}}>
          {plan.price}
          <span>USSD</span>
        </button>
      </footer>
    </section>
  );
}
