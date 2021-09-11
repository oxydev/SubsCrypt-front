import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/store";
import NewPlanCreation from "../../componenets/provider/signUp/newPlanCreation";
import { dataContext } from "../../context/getData";
import { useRouter } from "next/router";
import { Providerstyled } from "../../styles/pageStyle";

export default function AddNewPlan() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);

  const planNumber = globalState.providerPlans.length;

  //importing necessary data functions from the data context
  const { addNewPlans, getProviderAllInfo } = useContext(dataContext);

  //set a state hook fot storing plan forms data
  const [planList, setPlanList] = useState([
    {
      visibility: "visible",
      coins: [],
      characteristics: [],
      duration: "1 m",
      refund: 20,
    },
  ]);

  //set s variable for storing the form elements according to the list of plans
  let planFormList = planList.map((item, index) => (
    <NewPlanCreation
      key={"PlanForm" + index}
      planList={planList}
      setPlanList={setPlanList}
      index={index}
    />
  ));

  //function for adding another plan form to register another plan
  function addAnotherPlan() {
    const list = planList;
    for (const item of list) {
      item.visibility = "hidden";
    }
    setPlanList([
      ...list,
      { visibility: "visible", coins: [], characteristics: [], duration: "1 m", refund: 20 },
    ]);
  }

  //function for making all the form visible before registering. This is useful for visiting the input amounts and their validation results
  function makeFieldsVisible() {
    const list = planList;
    for (const item of list) {
      item.visibility = "visible";
    }
    setPlanList([...list]);
  }

  //function for calling after registeration result has been received
  function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);
    // console.log(status);
    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      events.forEach(({ event: { data, method, section }, phase }) => {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          allPlanPromise();
          window.alert("The operation has been done successfully");
        }
      });
      if (check == false) {
        window.alert("The operation failed!");
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      getProviderAllInfo(globalState.user.address);
    }
  }

  //function to make all promises in one promise and calling a callback after all of them has been fulfilled
  async function allPlanPromise() {
    let promiseList = [];
    planList.forEach((plan, index) => {
      var axios = require("axios");
      var config = {
        method: "patch",
        url: "https://api.subscrypt.io/profile/updateProductProfile",
        data: {
          providerAddress: globalState.user.address,
          planName: plan.title,
          planIndex: index + planNumber,
          description: plan.description,
        },
        headers: {
          "Content-Type": `application/json`,
        },
        crossDomain: true,
      };

      promiseList.push(axios(config));
    });
    await Promise.all(promiseList).then((results) => {
      // console.log("redirect here");
      // router.push("/provider");
      // console.log(results);
    });
  }

  //plan regiteration function
  function handleRegister(e) {
    e.preventDefault();
    var wallet = globalState.user.wallet;

    function parseDurations(planList) {
      var dur = [];
      planList.forEach((plan) => {
        if (plan.duration === "1 m") dur.push(30 * 24 * 60 * 60 * 1000);
        else if (plan.duration === "3 m") dur.push(3 * 30 * 24 * 60 * 60 * 1000);
        else if (plan.duration === "6 m") dur.push(6 * 30 * 24 * 60 * 60 * 1000);
      });
      return dur;
    }

    function parsePrices(planList) {
      var prices = [];
      planList.forEach((plan) => {
        prices.push(Number(plan.price) * 10 ** 12);
      });
      return prices;
    }

    function parsePolicies(planList) {
      var policies = [];
      planList.forEach((plan) => {
        policies.push(plan.refund * 10);
      });
      return policies;
    }

    function parseChars(planList) {
      const plansChars = [];
      planList.forEach((plan) => {
        const chars = [];
        plan.characteristics.forEach((char) => {
          chars.push(char.text);
        });
        plansChars.push(chars);
      });
      return plansChars;
    }

    var durations = parseDurations(planList);
    var prices = parsePrices(planList);
    var refundPolicies = parsePolicies(planList);
    var plansChars = parseChars(planList);

    addNewPlans(wallet, callback, durations, prices, refundPolicies, plansChars);
  }

  return (
    <Providerstyled className="ProviderSignUp AddPlanPage">
      <h1>Create a Subscription Plan #{planNumber + 1}</h1>
      <div className="row">
        <div className="Container--medium">
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister(e);
            }}
          >
            {planFormList}
            <button className="PlansForm-addBtn" onClick={addAnotherPlan}>
              Add another plan
            </button>
            <div className="ProviderRegisteration">
              <p>
                For signing up you need to send a transaction on chain to put
                the data in smart contract on blockchain. Normal gas fee
                applies.
              </p>
              <input
                type="submit"
                className="RegisterBtn"
                onClick={() => {
                  makeFieldsVisible();
                }}
                value="Register"
              ></input>
            </div>
          </form>
        </div>
        <div className="Container--small"></div>
      </div>
    </Providerstyled>
  );
}
