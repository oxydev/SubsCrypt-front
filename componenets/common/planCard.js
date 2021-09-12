import React, { useContext } from "react";
import localData from "../../data/providerPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import data from "../../data/testData/providerAddress.json";
import { UserContext } from "../../context/Store";
import { useRouter } from "next/router";
import { setDataContext } from "../../context/setData";
import styled from "styled-components";

const Card = styled.section`
  &.PlanCard {
    border: 1px solid ${({ theme }) => theme.Gray.gray6};
    border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
    margin: 0 12px;
    padding: 12px 16px;
    cursor: pointer;
    width: 200px;
    height: 240px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: 0.3s;
    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
    }

    header {
      display: flex;
      align-items: center;
      margin-bottom: 7px;
      flex-shrink: 0;
      & > h1 {
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
        font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
        color: ${({ theme }) => theme.Primary.primary};
        line-height: 1.4;
      }
    }
    main {
      font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray4};
      margin-bottom: 16px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      & > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    }
    footer {
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
    }
  }
  .PlanLogo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 15px;
    background-color: #bdbdbd;
    object-fit: cover;
  }
  .PlanCard-Provider {
    font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray4};
  }
  .PlanCard-description {
    color: ${({ theme }) => theme.Gray.gray3};
    margin-bottom: auto;
    line-height: 1.4;
  }
  .PlanCard-payMethod {
    display: flex;

    label {
      font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray4};
    }
  }

  .PlanCard-coinSelect {
    display: none;
  }
  .PlanCard-payBtn {
    padding: 5px 10px;
    display: inline-block;
    border-radius: 6px;
    background: ${({ theme }) => theme.Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${({ theme }) => theme.Color.white};
    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
    }
    span {
      font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: inherit;
      margin-left: 2px;
      cursor: pointer;
    }
  }
`;

//this component is for handling the card showing the plan specification
export default function PlanCard(props) {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const { plan, index, type, address } = props;
  const localPlans = localData.plans[index];
  const planIndex = plan.planIndex;
  const { handleSubscribtion } = useContext(setDataContext);
  const providerAddress = data.providerAddress;

  //Subscription function
  function handleSubscribe() {
    handleSubscribtion(providerAddress, plan, planIndex, callback);
  }

  //callback function after handling subscription
  function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      let check = false;
      events.forEach(({ event: { data, method, section }, phase }) => {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          check = true;
          window.alert("The operation has been done successfully");
        }
      });
      if (check == false) {
        window.alert("The operation failed!");
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      // loadUserDataByWallet(globalState.user.address);
      router.push("/user");
    }
  }

  return (
    <Card
      className="PlanCard"
      onClick={type == "user" ? handleSubscribe : () => {}}
    >
      <header>
        <img
          className="PlanLogo"
          src={"https://api.subscrypt.io/profile/getProviderPic/" + address}
        />
        <h1>{plan.name ? plan.name : "Loading..."}</h1>
      </header>
      <main>
        <div>
          <p className="PlanCard-Provider">{plan.providerName}</p>
          <p className="PlanCard-Rate">{localPlans.rate}</p>
        </div>
        <p className="PlanCard-description">{plan.description ? plan.description : "Loading..."}</p>
        <div>
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div>
          <h6>Refund Policy</h6>
          <p>{"% " + plan.max_refund_permille_policy.replace(/,/g, "") / 10 + " Refund"}</p>
        </div>
      </main>
      <footer>
        <div className="PlanCard-payMethod">
          <label>Pay with</label>
          <select className="PlanCard-coinSelect">
            <option value="coin1">coin1</option>
            <option value="coin2">coin2</option>
          </select>
        </div>
        <button className="PlanCard-payBtn" onClick={() => {}}>
          {/* {type == "provider"
            ? parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12)
            : plan.price} */}
          {parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12)}
          <span>DOT</span>
        </button>
      </footer>
    </Card>
  );
}
