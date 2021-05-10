import React from "react";
import OfferCard from "./offerCard";
import data from "../../../data/offers.json";

export default function OfferCarousel() {
  const offerCards = data.offers.map((item) => <OfferCard offer={item} />);
  return (
    <div className="OfferCarousel">
      <div className="OfferCarousel-itemList">{offerCards}</div>
      <button className="OfferCarousel-prevBtn" />
      <button className="OfferCarousel-nextBtn" />
    </div>
  );
}
