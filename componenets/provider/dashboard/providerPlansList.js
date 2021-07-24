import React, { useContext } from "react";
import PlanCard from "../../user/planCard";
import { UserContext } from "../../../context/store";

export default function ProviderPlansList(props) {
  const { globalState, dispatch } = useContext(UserContext);

  let plans = [];
  if (globalState.plans) {
    plans.push(...globalState.plans);
  }

  const plansCard = plans.map((item, index) => (
    <PlanCard key={"providerPlan" + index} offer={item} index={index} />
  ));
  return (
    <section className="ProviderPlansList">
      <h1>Your Plans</h1>
      <button className="ProviderPlansList-addPlanBtn">Add a Plan</button>
      <div>{plansCard}</div>
    </section>
  );
}
