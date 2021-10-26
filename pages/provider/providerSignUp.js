import React, { useContext, useEffect, useState } from "react";
import NewPlanCreation from "../../componenets/provider/signUp/newPlanCreation";
import ProviderInfo from "../../componenets/provider/signUp/providerInfo";
import { setDataContext } from "../../context/setData";
import { handleDataContext } from "../../context/handleData";
import { UserContext } from "../../context/store";
import { useRouter } from "next/router";
import { operationContext } from "../../context/handleUserOperation";
import tutData from "../../data/tutorial.json";
import { tutorialContext } from "../../context/tutorial";

export default function ProviderSignUp() {
  const router = useRouter();
  const { providerRegisterHandler } = useContext(setDataContext);
  const { getProviderAllInfo } = useContext(handleDataContext);
  const { globalState, dispatch } = useContext(UserContext);
  const { showResultToUser } = useContext(operationContext);
  const tutorialData = tutData.tutorials.becomeProvider;
  const { handleTutorial } = useContext(tutorialContext);

  useEffect(() => {
    handleTutorial(tutorialData);
  }, []);

  const [info, setInfo] = useState({
    ProviderMoneyAddress: globalState.user.address,
  });

  //
  const [planList, setPlanList] = useState([
    {
      visibility: "visible",
      coins: [],
      characteristics: [],
      duration: "1 m",
      refund: 20,
    },
  ]);
  let planFormList = planList.map((item, index) => (
    <NewPlanCreation
      key={"PlanForm" + index}
      planList={planList}
      setPlanList={setPlanList}
      index={index}
    />
  ));

  function addAnotherPlan() {
    const list = planList;
    for (const item of list) {
      item.visibility = "hidden";
    }
    setPlanList([
      ...list,
      {
        visibility: "visible",
        coins: [],
        characteristics: [],
        duration: "1 m",
        refund: 20,
      },
    ]);
  }

  async function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);
    // console.log(status);
    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      events.forEach(async ({ event: { data, method, section }, phase }) => {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          // window.alert("The operation has been done successfully");
          await showResultToUser(
            "Operation Successful!",
            "The operation has been done successfully"
          );
          // console.log("doneee");
          const axios = require("axios");
          const FormData = require("form-data");
          let formData = new FormData();
          formData.append("profile", info.image);
          formData.append("providerAddress", globalState.user.address);
          formData.append("description", info.ProviderDescription);
          formData.append("providerName", info.ProviderName);
          var config = {
            method: "post",
            url: "https://api.subscrypt.io/profile/newProviderRegister",
            data: formData,
            headers: {
              "Content-Type": `multipart/form-data;`,
            },
            crossDomain: true,
          };
          axios(config)
            .then(function (response) {
              if (response.status === 200) {
                allPlanPromise();
              }
            })
            .catch(function () {
              alert("error");
              // console.log(error);
            });
        }
      });
      if (check === false) {
        // window.alert("The operation failed!");
        await showResultToUser(
          "Operation failed!",
          "The operation has been failed!"
        );
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      getProviderAllInfo(globalState.user.address);
    }
  }

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
          planIndex: index,
          description: plan.description,
        },
        headers: {
          "Content-Type": `application/json`,
        },
        crossDomain: true,
      };

      promiseList.push(axios(config));
    });
    await Promise.all(promiseList).then(() => {
      dispatch({ type: "REGISTERED", payload: true });
      router.push("/provider");
      // console.log(results);
    });
  }

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

  function makeFieldsVisible() {
    const list = planList;
    for (const item of list) {
      item.visibility = "visible";
    }
    setPlanList([...list]);
  }

  async function handleRegister() {
    const image = info.image;
    if (!image) {
      // window.alert("You should upload a photo!");
      await showResultToUser(
        "Photo is necessary!",
        "You should upload a photo!"
      );
    } else {
      if (info.ProviderPassword !== info.ProviderConfirmedPasswords) {
        // window.alert("Password has not been comfirmed correctly!!");
        await showResultToUser(
          "Password Comfirmation!",
          "Password has not been comfirmed correctly!!"
        );
      } else {
        var wallet = globalState.user.wallet;

        var durations = parseDurations(planList);
        var prices = parsePrices(planList);
        var refundPolicies = parsePolicies(planList);
        var plansChars = parseChars(planList);

        providerRegisterHandler(
          wallet,
          callback,
          durations,
          prices,
          refundPolicies,
          info.ProviderMoneyAddress,
          info.ProviderUsername,
          info.ProviderPassword,
          plansChars
        ).catch(async () => {
          await showResultToUser(
            "Operation failed!",
            "The operation has been failed!"
          );
        });
      }
    }
  }

  return (
    <section className="ProviderSignUp">
      <h1>Sign up as a Service Provider</h1>
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
            <ProviderInfo info={info} setInfo={setInfo} />
            {planFormList}
            <button
              id={"addAnotherPlan"}
              className="PlansForm-addBtn"
              onClick={addAnotherPlan}
            >
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
                id={"register"}
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
    </section>
  );
}
