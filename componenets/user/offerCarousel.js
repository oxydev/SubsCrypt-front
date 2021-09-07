import React, { useContext } from "react";
import PlanCard from "../common/planCard";
import { UserContext } from "../../context/store";
import styled from "styled-components";

const Carousel = styled.div`
  &.OfferCarousel {
    position: relative;
  }
  .OfferCarousel-itemList {
    display: flex;
  }
  .OfferCarousel-prevBtn,
  .OfferCarousel-nextBtn {
    width: 13px;
    height: 26px;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    background-image: url("/icons/png/rightArrow.png");
  }
  .OfferCarousel-nextBtn {
    right: -35px;
  }
  .OfferCarousel-prevBtn {
    transform: scaleX(-1);
    left: -35px;
  }
`;

//The  component for generating offer plan carousel
export default function OfferCarousel() {
  const { globalState } = useContext(UserContext);
  let plans = [];
  if (globalState.providerPlans.length > 0) {
    plans.push(...globalState.providerPlans);
  }

  const offerCards = plans.map((item, index) => (
    <PlanCard
      key={"providerPlan" + index}
      plan={item}
      index={index}
      type="user"
      address={item.providerAddress}
    />
  ));
  return (
    <Carousel className="OfferCarousel">
      <div className="OfferCarousel-itemList">{offerCards}</div>
      <button className="OfferCarousel-prevBtn" />
      <button className="OfferCarousel-nextBtn" />
    </Carousel>
  );
}
