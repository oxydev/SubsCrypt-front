import React, { useContext } from "react";
import localData from "../../data/providerPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import { dataContext } from "../../context/getData";
import data from "../../data/testData/providerAddress.json";
import { UserContext } from "../../context/store";
import { useRouter } from "next/router";

//this component is for handling the card showing the plan specification
export default function PlanCard(props) {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const { plan, index, type, address } = props;
  const localPlans = localData.plans[index];
  const planIndex = plan.planIndex;
  const { handleSubscribtion, loadUserDataByWallet } = useContext(dataContext);
  const providerAddress = data.providerAddress;

  //Subscription function
  function handleSubscribe() {
    handleSubscribtion(providerAddress, plan, planIndex, callback);
  }

  //callback function after handling subscription
  function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      events.forEach(({ event: { data, method, section }, phase }) => {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          window.alert("The operation has been done successfully");
        }
      });
      if (check == false) {
        window.alert("The operation failed!");
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      loadUserDataByWallet(globalState.user.userWallet.address);
      router.push("/user");
    }
  }

  return (
    <section className="PlanCard" onClick={type == "user" ? handleSubscribe : () => {}}>
      <header>
        <img
          className="PlanLogo"
          src={"http://206.189.154.160:3000/profile/getProviderPic/" + address}
        />
        <h1>{plan.name ? plan.name : "Loading..."}</h1>
      </header>
      <main>
        <div>
          <p className="PlanCard-Provider">{plan.providerName}</p>
          <p className="PlanCard-Rate">{localPlans.rate}</p>
        </div>
        <p className="PlanCard-description">{plan.description ? plan.description : "Loading..."}</p>
        <div>
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div>
          <h6>Refund Policy</h6>
          <p>{"% " + plan.max_refund_permille_policy / 10 + " Refund"}</p>
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
          {/* {type == "provider"
            ? parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12)
            : plan.price} */}
          {parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12)}
          <span>DOT</span>
        </button>
      </footer>
    </section>
  );
}
