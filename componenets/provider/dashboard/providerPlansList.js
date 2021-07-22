import React, { useContext } from "react";
import OfferCard from "../../user/userSubscryption/offerCard";
import { UserContext } from "../../../context/store";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProviderPlansList(props) {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);

  let plans = [];
  if (globalState.providerPlans) {
    plans.push(...globalState.providerPlans);
  }

  const plansCard = plans.map((item, index) => (
    <OfferCard key={"providerPlan" + index} plan={item} index={index} type="provider" />
  ));
  return (
    <section className="ProviderPlansList">
      <header>
        <h1>Your Plans</h1>
        <p>Total Plans: {plans.length}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/provider/addnewplan");
          }}
          className="ProviderPlansList-addPlanBtn"
        >
          Add a Plan
        </button>
      </header>
      <div>{plansCard}</div>
    </section>
  );
}
