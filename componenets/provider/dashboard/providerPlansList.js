import React from "react";
import data from "../../../data/providerPlans.json";
import OfferCard from "../../user/userSubscryption/offerCard";

export default function ProviderPlansList(props) {
  const plansCard = data.plans.map((item) => <OfferCard key={item.name} offer={item} />);
  return (
    <section className="ProviderPlansList">
      <h1>Your Plans</h1>
      <button className="ProviderPlansList-addPlanBtn">Add a Plan</button>
      <div>{plansCard}</div>
    </section>
  );
}
