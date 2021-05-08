import React from "react";
import OfferCarousel from "./offerCarousel";

export default function SubscryptionOffers() {
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
