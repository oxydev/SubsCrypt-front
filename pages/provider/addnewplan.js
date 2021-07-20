import { useContext, useState } from "react";
import { UserContext } from "../../context/store";
import NewPlanCreation from "../../componenets/provider/signUp/newPlanCreation";

export default function AddNewPlan() {
  const { globalState, dispatch } = useContext(UserContext);
  const planNumber = globalState.providerPlans.length;
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
    setPlanList([...list, { visibility: "visible", coins: [], characteristics: [] }]);
  }

  console.log(planList);

  return (
    <section className="ProviderSignUp AddPlanPage">
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
                For signing up you need to send a transaction on chain to put the data in smart
                contract on blockchain. Normal gas fee applies.
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
    </section>
  );
}
