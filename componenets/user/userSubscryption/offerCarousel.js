import React, { useContext } from "react";
import OfferCard from "./offerCard";
import data from "../../../data/offers.json";
import { UserContext } from "../../../context/store";

export default function OfferCarousel() {
  const { globalState, dispatch } = useContext(UserContext);
  let plans = [];
  if (globalState.providerPlans.length > 0) {
    plans.push(...globalState.providerPlans);
  }

  const offerCards = plans.map((item, index) => (
    <OfferCard key={"providerPlan" + index} plan={item} index={index} type="user" />
  ));
  return (
    <div className="OfferCarousel">
      <div className="OfferCarousel-itemList">{offerCards}</div>
      <button className="OfferCarousel-prevBtn" />
      <button className="OfferCarousel-nextBtn" />
    </div>
  );
}
