import React, { useContext } from "react";
import localData from "../../data/providerPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import data from "../../data/testData/providerAddress.json";

export default function PlanCard(props) {
  const plan = props.offer;
  const index = props.index;
  const localPlans = localData.plans[index];
  const planIndex = plan.planIndex;
  const { globalState, dispatch } = useContext(UserContext);
  const { handleSubscribtion } = useContext(dataContext);
  const providerAddress = data.providerAddress;
  console.log(globalState);

  //Subscription function
  function handleSubscribe() {
    handleSubscribtion(providerAddress, plan, planIndex, callback);
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
    <section className="PlanCard" onClick={handleSubscribe}>
      <header>
        <img className="OfferLogo" src={localPlans.logoURL} />
        <h1>{localPlans.name}</h1>
      </header>
      <main>
        <div>
          <p className="PlanCard-Provider">{localPlans.provider}</p>
          <p className="PlanCard-Rate">{localPlans.rate}</p>
        </div>
        <p className="PlanCard-description">{localPlans.description}</p>
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
        <div className="PlanCard-payMethod">
          <label>Pay with</label>
          <select className="PlanCard-coinSelect">
            <option value="coin1">coin1</option>
            <option value="coin2">coin2</option>
          </select>
        </div>
        <button className="PlanCard-payBtn" onClick={() => {}}>
          {plan.price}
          <span>USSD</span>
        </button>
      </footer>
    </section>
  );
}
