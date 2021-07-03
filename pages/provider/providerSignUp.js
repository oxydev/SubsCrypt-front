import React, { useState } from "react";
import NewPlanCreation from "../../componenets/provider/signUp/newPlanCreation";
import ProviderInfo from "../../componenets/provider/signUp/providerInfo";

export default function ProviderSignUp(props) {
  const [info, setInfo] = useState({});
  const [planList, setPlanList] = useState([
    { visibility: "visible", coins: [] },
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
    setPlanList([...list, { visibility: "visible", coins: [] }]);
  }

  return (
    <section className="ProviderSignUp">
      <h1>Sign up as a Service Provider</h1>
      <div className="row">
        <div className="Container--medium">
          <ProviderInfo info={info} setInfo={setInfo} />
          {planFormList}
          <button className="PlansForm-addBtn" onClick={addAnotherPlan}>
            Add another plan
          </button>
          <div className="ProviderRegisteration">
            <p>
              For signing up you need to send a transaction on chain to put the
              data in smart contract on blockchain. Normal gas fee applies.
            </p>
            <button>Register</button>
          </div>
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
