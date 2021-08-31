import React, { useContext } from "react";
import PlanCard from "../../common/planCard";
import { UserContext } from "../../../context/store";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";

//carousel size
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

//The component for generating the provider plan lists
export default function ProviderPlansList() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);

  let plans = [];
  if (globalState.providerPlans) {
    plans.push(...globalState.providerPlans);
  }
  const plansCard = plans.map((item, index) => (
    <PlanCard
      key={"providerPlan" + index}
      plan={item}
      index={index}
      type="provider"
      address={globalState.user.address}
    />
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
      <Carousel responsive={responsive}>{plansCard}</Carousel>
    </section>
  );
}
