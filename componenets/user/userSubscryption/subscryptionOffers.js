import React, { useContext } from "react";
import OfferCarousel from "./offerCarousel";
import data from "../../../data/testData/providerAddress.json";
import { UserContext } from "../../../context/store";
import { loadPlan } from "../../../dataFunctions/getData";

export default function SubscryptionOffers() {
  const { globalState, dispatch } = useContext(UserContext);
  const providerAddress = data.providerAddress;
  if (globalState.providerPlans && globalState.providerPlans.length == 0) {
    loadPlan(providerAddress, 0, dispatch);
    loadPlan(providerAddress, 1, dispatch);
    loadPlan(providerAddress, 2, dispatch);
  }

  return (
    <section className="SubscryptionOffers">
      <h1>Currently you dont have any active plans</h1>
      <div className="OfferPart">
        <h2>
          You can view all the available plans to purchase in this link or pick among suggested
          plans for you 👾
        </h2>
        <OfferCarousel />
      </div>
    </section>
  );
}
