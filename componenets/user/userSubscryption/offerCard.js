import React, { useContext } from "react";
import localData from "../../../data/providerPlans.json";
import * as utils from "../../../utilities/utilityFunctions";
import { subscribePlan, getWalletInjector } from "../../../dataFunctions/getData";
import { UserContext } from "../../../context/store";
import data from "../../../data/testData/providerAddress.json";

export default function OfferCard(props) {
  const plan = props.offer;
  const index = props.index;
  const localPlans = localData.plans[index];
  const planIndex = plan.planIndex;
  const { globalState, dispatch } = useContext(UserContext);
  const walletAddress = globalState.user.userWallet;
  const providerAddress = data.providerAddress;
  const injector = getWalletInjector(walletAddress);

  function handleSubscribe() {
    console.log(walletAddress);
    subscribePlan(walletAddress, injector, callback, providerAddress, planIndex);
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
