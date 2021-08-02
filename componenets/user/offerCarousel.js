import React, { useContext } from "react";
import PlanCard from "../common/planCard";
import { UserContext } from "../../context/store";

//The  component for generating offer plan carousel
export default function OfferCarousel() {
  const { globalState } = useContext(UserContext);
  let plans = [];
  if (globalState.providerPlans.length > 0) {
    plans.push(...globalState.providerPlans);
  }

  const offerCards = plans.map((item, index) => (
    <PlanCard key={"providerPlan" + index} plan={item} index={index} type="user" address={globalState.user.userWallet.address} />
  ));
  return (
    <div className="OfferCarousel">
      <div className="OfferCarousel-itemList">{offerCards}</div>
      <button className="OfferCarousel-prevBtn" />
      <button className="OfferCarousel-nextBtn" />
    </div>
  );
}
