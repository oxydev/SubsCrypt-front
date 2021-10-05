import React, { useContext } from "react";
import PlanCard from "../../common/planCard";
import { UserContext } from "../../../context/Store";
import { useRouter } from "next/router";
import styled from "styled-components";
import Carousel from 'react-multi-carousel'

const PlanRoot = styled.section`
  &.ProviderPlansList {
    margin-bottom: 44px;
    & > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;

      h1 {
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
        font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
        color: ${({ theme }) => theme.Primary.primary};
        line-height: 1.4;
      }
      p {
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
        font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
        line-height: 1.5;
        color: #8a8f99;
        margin-left: auto;
        margin-right: 17px;
      }
    }

    & > div {
      display: flex;
    }
  }
  .ProviderPlansList-addPlanBtn {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.5;
    color: #8a8f99;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: block;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      background-position: center;
      background-image: url("/icons/png/uploadBtn.png");
      background-size: 16px;
      position: static;
      margin-right: 24px;
      background-color: ${({ theme }) => theme.Gray.gray6};
    }
  }
`;
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
    <PlanRoot className="ProviderPlansList">
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
      <div>{plansCard}</div>

      <Carousel responsive={responsive}>{plansCard}</Carousel>
    </PlanRoot>
  );
}
