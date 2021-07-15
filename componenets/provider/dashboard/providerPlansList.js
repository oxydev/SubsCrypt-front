import React, { useContext } from "react";
import OfferCard from "../../user/userSubscryption/offerCard";
import { UserContext } from "../../../context/store";

export default function ProviderPlansList(props) {
  const { globalState, dispatch } = useContext(UserContext);

  let plans = [];
  if (globalState.providerPlans) {
    plans.push(...globalState.providerPlans);
  }

  const plansCard = plans.map((item, index) => (
    <OfferCard key={"providerPlan" + index} offer={item} index={index} />
  ));
  return (
    <section className="ProviderPlansList">
      <header>
        <h1>Your Plans</h1>
        <p>Total Plans: {plans.length}</p>
        <button className="ProviderPlansList-addPlanBtn">Add a Plan</button>
      </header>
      <div>{plansCard}</div>
    </section>
  );
}
