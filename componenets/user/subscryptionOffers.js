import React, { useContext, useEffect } from "react";
import OfferCarousel from "./offerCarousel";
import data from "../../data/testData/providerAddress.json";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import ProviderSelection from "./providerSelection";
import { testDataContext } from "../../context/getDataTest";

//The component for managing subscription offer part
export default function SubscryptionOffers() {
  const { globalState } = useContext(UserContext);
  const { loadOffers } = useContext(testDataContext);
  // const providerAddress = data.providerAddress;
  const providerAddress = globalState.offerProvider;

  useEffect(() => {
    // if (globalState.providerPlans && globalState.providerPlans.length == 0) {
    //   loadPlan(providerAddress, 0);
    //   loadPlan(providerAddress, 1);
    //   loadPlan(providerAddress, 2);
    // }

    loadOffers(providerAddress);
  }, [providerAddress]);

  return (
    <section className="SubscryptionOffers">
      <h1>Currently you don't have any active plans</h1>
      <ProviderSelection />
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
