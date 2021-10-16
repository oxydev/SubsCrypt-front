import React, { useContext, useEffect } from "react";
import OfferCarousel from "./offerCarousel";
import { UserContext } from "../../context/store";
import ProviderSelection from "./providerSelection";
import { handleDataContext } from "../../context/handleData";
import { authContext } from "../../pages/_app";

//The component for managing subscription offer part
export default function SubscryptionOffers() {
  const { globalState } = useContext(UserContext);
  const { loadOffers } = useContext(handleDataContext);
  const { auth } = useContext(authContext);

  // const providerAddress = data.providerAddress;
  const providerAddress = globalState.offerProvider;

  useEffect(() => {
    if (auth && globalState.user.address) {
      loadOffers(providerAddress);
    }
  }, [providerAddress,globalState.user.address]);

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
