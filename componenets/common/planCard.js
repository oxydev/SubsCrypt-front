import React, { useContext } from "react";
import * as utils from "../../utilities/utilityFunctions";
import { UserContext } from "../../context/store";
import { useRouter } from "next/router";
import { setDataContext } from "../../context/setData";
import { modalContext } from "../../context/modal";
import { operationContext } from "../../context/handleUserOperation";
import { PlansDetailsModal } from "../provider/dashboard/planDetailsModal";
import { handleDataContext } from "../../context/handleData";

//this component is for handling the card showing the plan specification
export default function PlanCard(props) {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const { getProviderAllInfo, handleSubscriberLoginByWallet } =
    useContext(handleDataContext);

  const { setModal } = useContext(modalContext);
  const { plan, index, type, address, id } = props;
  const planIndex = plan.planIndex;
  const { handleSubscribtion, editPlan } = useContext(setDataContext);
  const { showResultToUser } = useContext(operationContext);

  //Subscription function
  function handleSubscribe() {
    handleSubscribtion(address, plan, planIndex, callback).catch(async () => {
      await showResultToUser(
        "Operation failed!",
        "The operation has been failed!"
      );
    });
  }

  //callback function after handling subscription
  async function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      for (const {
        event: { data1, method, section },
        phase,
      } of events) {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          // window.alert("The operation has been done successfully");
          await showResultToUser(
            "Successful SubsCryption!",
            "You are successfully subscribed to this plan, please wait while your transaction gets confirmed on Blockchain."
          );
        }
      }
      if (check === false) {
        await showResultToUser(
          "Operation failed!",
          "The operation has been failed!"
        );
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      handleSubscriberLoginByWallet(globalState.user.address);
      router.push("/");
    }
  }

  function handleEdit() {
    const modalElement = (
      <PlansDetailsModal
        plan={plan}
        handleEditPlan={editPlan}
        showResultToUser={showResultToUser}
        getProviderAllInfo={getProviderAllInfo}
      />
    );
    setModal(modalElement);
  }

  return (
    <section
      id={id}
      className="PlanCard"
      onClick={type === "user" ? handleSubscribe : handleEdit}
    >
      <header>
        <img
          className="PlanLogo"
          src={"https://api.subscrypt.io/profile/getProviderPic/" + address}
        />
        <h1>{plan.name ? plan.name : "Loading..."}</h1>
      </header>
      <main>
        <div>
          <p className="PlanCard-Provider">{plan.providerName}</p>
          <p className="PlanCard-Rate">4.5</p>
        </div>
        <p className="PlanCard-description">
          {plan.description ? plan.description : "Loading..."}
        </p>
        <div>
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div>
          <h6>Refund Policy</h6>
          <p>
            {"% " +
              plan.max_refund_permille_policy.replace(/,/g, "") / 10 +
              " Refund"}
          </p>
        </div>
        <div className="PlanCard-price">
          <h6>Pay with</h6>
          <p>
            {parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12)}
            <span> SubC</span>
          </p>
        </div>
      </main>
      <footer>
        <button className="PlanCard-button">
          {type === "user" ? "Subscribe" : "Edit Plan"}
        </button>
      </footer>
    </section>
  );
}
