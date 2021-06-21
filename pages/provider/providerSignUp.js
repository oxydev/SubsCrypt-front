import React, { useState } from "react";
import NewPlanCreation from "../../componenets/provider/signUp/newPlanCreation";
import ProviderInfo from "../../componenets/provider/signUp/providerInfo";

export default function ProviderSignUp(props) {
  const [info, setInfo] = useState({});
  const [planList, setPlanList] = useState([{ coins: [] }]);
  let planFormList = planList.map((item, index) => (
    <NewPlanCreation
      key={"PlanForm" + index}
      planList={planList}
      setPlanList={setPlanList}
      index={index}
    />
  ));

  return (
    <section className="ProviderSignUp">
      <h1>Sign up as a Service Provider</h1>
      <div className="row">
        <div className="Container--medium">
          <ProviderInfo info={info} setInfo={setInfo} />
          {planFormList}
          <div className="ProviderRegisteration">
            <p>
              For signing up you need to send a transaction on chain to put the data in smart
              contract on blockchain. Normal gas fee applies.
            </p>
            <button>Register</button>
          </div>
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
