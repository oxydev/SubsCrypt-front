import React, { useContext, useEffect } from "react";
import OfferCarousel from "./offerCarousel";
import data from "../../data/testData/providerAddress.json";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import ProviderSelection from "./providerSelection";
import styled from "styled-components";

const SubscriptionRoot = styled.section`
  &.SubscryptionOffers {
    border: 1px solid #e6e7eb;
    border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
    padding: 78px 47px 64px;
    position: relative;
    width: 100%;
    //
    // display: none;

    & > h1 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      line-height: 1.5;
      color: ${({ theme }) => theme.Gray.gray3};
      margin-bottom: 67px;
      position: relative;

      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 19px;
        height: 17px;
        background-image: url("/icons/png/sunscryption/Wallet.png");
        background-position: center;
        background-size: contain;
        left: -30px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  &.SubscryptionOffers::after {
    content: "";
    display: block;
    position: absolute;
    width: 139px;
    height: 126px;
    background-image: url("/icons/png/sunscryption/OffersIcon.png");
    background-position: center;
    background-size: contain;
    top: 10%;
    right: 15%;
  }
  .OfferPart {
    & > h2 {
      @include text-body--lightSmall--light;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray3};
      margin-bottom: 24px;
      max-width: 379px;
    }
  }
`;

//The component for managing subscription offer part
export default function SubscryptionOffers() {
  const { globalState } = useContext(UserContext);
  const { loadOffers } = useContext(dataContext);
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
    <SubscriptionRoot className="SubscryptionOffers">
      <h1>Currently you don't have any active plans</h1>
      <ProviderSelection />
      <div className="OfferPart">
        <h2>
          You can view all the available plans to purchase in this link or pick
          among suggested plans for you 👾
        </h2>
        <OfferCarousel />
      </div>
    </SubscriptionRoot>
  );
}
