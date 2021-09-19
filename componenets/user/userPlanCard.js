import React, { useState, useContext, useEffect } from "react";
import localData from "../../data/sunscryptionPlans.json";
import * as utils from "../../utilities/utilityFunctions";
import { UserContext } from "../../context/Store";
import { setDataContext } from "../../context/setData";
import PercentageBar from "../gadjets/percentageBar";
import styled from "styled-components";
import OperationModal from './operationModal'
import { modalContext } from '../../context/modal'

const PlanCard = styled.section`
  &.UserPlanCard {
    display: flex;
    align-items: flex-start;
    border-top: 2px solid #e6e7eb;
    padding: 16px 30px;

    &:last-child {
      border-bottom: 2px solid #e6e7eb;
    }

    &.expired {
      background-color: ${({ theme }) => theme.Gray.gray5};
    }

    &.warning {
      background-color: ${({ theme }) => theme.Color.warning};
    }
  }
  .UserPlan-logo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: auto;
    margin-right: 24px;
    flex-shrink: 0;
    background-color: #bdbdbd;
    object-fit: cover;
  }
  .UserPlan-specs {
    margin-right: 32px;
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }
  .UserPlan-featurBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: auto;
    padding-right: 15%;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    color: ${({ theme }) => theme.Primary.primary};
    line-height: 1.4;

    &:last-child {
      margin-top: 0;
    }
    h6 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray3};
    }
    p {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray4};
      text-align: right;
    }
  }
  .UserPlan-name {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    color: ${({ theme }) => theme.Primary.primary};
    line-height: 16px;
    margin: 7px 0;
    width: 150px;
  }
  .UserPlan-Provider {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray4};
    margin-bottom: 14px;
  }
  .UserPlan-desc {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray3};
    width: 201px;
    margin: 7px 0;
  }
  .UserPlan-rate {
    display: flex;
    margin-top: 7px;
    h6,
    p {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray4};
    }
    h6 {
      margin-right: auto;
    }
  }
  .UsePlanPercentage {
    height: 11px;
    width: 198px;
    margin: 7px 0;
    background-size: contain;
  }
  .UsePlan-useAnnounce {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray3};
    margin-bottom: 15px;
    max-width: 128px;
  }
  .UserPlan-PayPart {
    margin-top: auto;
    display: flex;
    align-items: center;
  }
  .UserPlan-payMethod {
    margin-right: auto;
  }
  .UserPlan-payMethod {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray4};
  }
  .UserPlan-coinSelect {
    display: none;
  }
  .UserPlan-refundBtn {
    padding: 5px 10px;
    display: inline-block;
    border-radius: 10px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.Gray.gray5};
    outline: none;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray3};

    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
    }
    &:disabled {
      box-shadow: none;
      cursor: default;
      opacity: 0.4;
    }
  }
  .UserPlan-renewBtn {
    padding: 5px 10px;
    display: inline-block;
    border-radius: 10px;
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
    margin-left: 8px;
  }
  .UserPlan-subscribeBtn {
    height: 21px;
    padding: 5px 10px;
    display: inline-block;
    border-radius: 10px;
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
    width: 100px;

    &.loading {
      opacity: 0.5;
    }
  }
`;

let subscrypt;

//The component for generating a plan card which user has
export default function UserPlanCard(props) {
  let plan = props.plan.plan;
  // console.log(props.plan);
  const index = props.index;
  const localPlans = localData.userPlans[index];
  const { globalState } = useContext(UserContext);
  const { handleSubscribtion, handleRenewPlan, handleRefundPlan } = useContext(setDataContext);
  const {setModal , setCallBack}=useContext(modalContext)
  const planStatus = props.plan.status;
  const walletAddress = globalState.user.wallet;
  const [localLoading, setLocalLoading] = useState(false);

  //plan amounts
  const usedPercentage = utils.usePercentage(
    parseInt(props.plan.subscription_time.replace(/,/g, "")),
    parseInt(plan.duration.replace(/,/g, ""))
  );

  const refundPolicy = plan.max_refund_permille_policy.replace(/,/g, "") / 10;

  const price = parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12);
  const remianPercentage = 100 - usedPercentage;

  const possibleRefund = Math.min(refundPolicy, remianPercentage);
  const refundAmount = (price * possibleRefund) / 100;
  // console.log(refundAmount);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  });

  //Get plan charactrisics
  async function getCharacs() {
    await (await subscrypt)
      .getPlanCharacteristics(props.plan.provider, props.plan.plan_index)
      .then((result) => {
        // console.log(result);
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          handleSubscribtion(props.plan.provider, plan, props.plan.plan_index, callback);
          setLocalLoading(false);
        }
      });
  }

  //Subscription function
  function handleSubscribe() {
    setLocalLoading(true);
    // console.log(walletAddress);
    getCharacs();
  }

  //Refunding function
  function handleRefund() {
    handleRefundPlan(props.plan.provider, plan, props.plan.plan_index, callback);
  }

  //Renew function
  function handleRenew() {
    // console.log(props.plan);
    handleRenewPlan(props.plan.provider, props.plan, props.plan.plan_index, callback);
  }

  //callback function
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
          //convert alert by modal
          //window.alert("The operation has been done successfully");
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          async function modal(){
            const modalElement=<OperationModal text={"The operation has been done successfully"}/>
            setModal(modalElement)
            await sleep(5000)
          }
          modal()
          check = true;
        }
      });
      if (check == false) {
        //convert alert by modal
        //window.alert("The operation failed!");
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function modal(){
          const modalElement=<OperationModal text={"The operation failed!"}/>
          setModal(modalElement)
          await sleep(5000)
        }

        modal()

      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      // loadUserDataByWallet(globalState.user.address);
    }
  }

  return (
    <PlanCard
      className={
        planStatus == -1
          ? "UserPlanCard expired"
          : planStatus > 90
          ? "UserPlanCard warning"
          : "UserPlanCard"
      }
    >
      <img
        className="UserPlan-logo"
        src={"https://api.subscrypt.io/profile/getProviderPic/" + props.plan.provider}
      />
      <div className="UserPlan-specs">
        <p className="UserPlan-name">{props.plan.name ? props.plan.name : "Loading..."}</p>
        <p className="UserPlan-Provider">
          {props.plan.providerName ? props.plan.providerName : "Loading..."}
        </p>
        <div className="UserPlan-featurBox">
          <h6>Duration</h6>
          <p>{utils.duration(parseInt(plan.duration.replace(/,/g, "")))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Refund Policy</h6>
          <p>{"% " + refundPolicy + " Refund"}</p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <p className="UserPlan-desc">{props.plan.description}</p>
        <div className="UserPlan-featurBox">
          <h6>Activation date</h6>
          <p>{utils.timeStamptoDate(parseInt(props.plan.subscription_time.replace(/,/g, "")))}</p>
        </div>
        <div className="UserPlan-featurBox">
          <h6>Expires on</h6>
          <p>
            {utils.timeStamptoDate(
              parseInt(props.plan.subscription_time.replace(/,/g, "")) +
                parseInt(plan.duration.replace(/,/g, ""))
            )}
          </p>
        </div>
      </div>
      <div className="UserPlan-specs">
        <div className="UserPlan-rate">
          <h6>Rate this provider</h6>
          <p>{localPlans.rateAmmount} rates </p>
          {/* <p>{localPlans.rateNumber}</p> */}
        </div>
        <div className="UsePlanPercentage">
          <PercentageBar percentage={usedPercentage} />
        </div>

        <p className="UsePlan-useAnnounce">You have used {"%" + usedPercentage} of the service</p>
        {planStatus != -1 && (
          <p className="UsePlan-useAnnounce">Refundable amount: {refundAmount} Dot</p>
        )}

        <div className="UserPlan-PayPart">
          <div className="UserPlan-payMethod">
            <label>Pay with</label>
            <select className="UserPlan-coinSelect">
              <option value="coin1">coin1</option>
              <option value="coin2">coin2</option>
            </select>
          </div>
          {planStatus == -1 ? (
            <>
              <button
                className={localLoading ? "UserPlan-subscribeBtn loading" : "UserPlan-subscribeBtn"}
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </>
          ) : (
            <>
              <button className="UserPlan-refundBtn" onClick={handleRefund}>
                Refund
              </button>
              <button className="UserPlan-renewBtn" onClick={handleRenew}>
                Renew
              </button>
            </>
          )}
        </div>
      </div>
    </PlanCard>
  );
}
