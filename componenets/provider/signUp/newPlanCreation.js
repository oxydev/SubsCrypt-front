import React, { useState } from "react";
import PercentSlider from "../../gadjets/percetageSlider";
import TagInput from "../../gadjets/tagInput";

export default function NewPlanCreation(props) {
  const { planList, setPlanList, index } = props;
  const [refundValue, setRefundValue] = useState(0);

  function handlePlanListUpdate(key, value) {
    planList[index][key] = value;
    setPlanList([...planList]);
  }

  function handleCoinCheckBox(e) {
    console.log(e.target.value);
    const status = e.target.checked;
    if (status) {
      planList[index].coins.push(e.target.value);
      setPlanList([...planList]);
    } else {
      let coinsIndex = planList[index].coins.indexOf(e.target.value);
      console.log(coinsIndex);
      planList[index].coins.splice(coinsIndex, 1);
      setPlanList([...planList]);
    }
  }

  function toggleVisibility() {
    const status = planList[index].visibility;
    if (status == "visible") {
      handlePlanListUpdate("visibility", "hidden");
    } else {
      handlePlanListUpdate("visibility", "visible");
    }
  }
  console.log(planList);

  return (
    <section
      className={
        planList[index].visibility == "visible" ? "NewPlanCreation" : "NewPlanCreation hidden"
      }
    >
      <h1 onClick={toggleVisibility}>
        Create a Subscryption Plan #{index + 1}
        <span></span>
      </h1>
      <form className="PlanForm">
        <div className="PlanForm-info">
          <label htmlFor="PlanTitle">Plan Title</label>
          <input
            type="text"
            name="PlanTitle"
            placeholder="e.g. One Month of Premium Membership"
            onChange={(e) => {
              handlePlanListUpdate("title", e.target.value);
            }}
          />
          <p>Short and specific title of the plan</p>
          <label htmlFor="PlanDescription">Plan Description</label>
          <input
            type="text"
            name="PlanDescription"
            placeholder="Information about the plan"
            onChange={(e) => {
              handlePlanListUpdate("description", e.target.value);
            }}
          />
          <p>Short and specific details of the plan</p>
          <label>Plan Duration</label>
          <select
            type="text"
            name="PlanDuration"
            placeholder="Select Duration of Plan"
            onChange={(e) => {
              handlePlanListUpdate("duration", e.target.value);
            }}
          >
            <option value="1">1 Month</option>
            <option vlaue="3">3 months</option>
            <option value="6">6 months</option>
          </select>
          <p>Select from the list</p>
          <label>Refund Policy</label>
          <div className="PlansForm-refund">
            <PercentSlider
              callBack={handlePlanListUpdate}
              value={refundValue}
              handleChange={setRefundValue}
            />
          </div>
          <p>
            Users can refund <span>{refundValue} percent</span> of the plan at any time. Minimum
            amount is %70.
          </p>
          <label>Special Charactristics of the plan</label>
          <div className="PlansForm-tag">
            <TagInput handleChange={handlePlanListUpdate} />
          </div>
          <p>Some characteristics your plan may have e.g. Country, Region and etc.</p>
        </div>
        <div className="PlanForm-financial">
          <label htmlFor="PlanTokens">Users can pay via these tokens</label>
          <div className="PlanForm-payCheckbox">
            <input
              value="polkadot"
              type="checkbox"
              name="Polkadot"
              onChange={(e) => {
                handleCoinCheckBox(e);
              }}
            ></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label htmlFor="Polkadot">Polkadot (DOT)</label>
          </div>
          <div className="PlanForm-payCheckbox">
            <input
              value="bitCoin"
              type="checkbox"
              name="Polkadot"
              onChange={(e) => {
                handleCoinCheckBox(e);
              }}
            ></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label htmlFor="Polkadot">Polkadot (DOT)</label>
          </div>
          <div className="PlanForm-payCheckbox">
            <input
              value="dollar"
              type="checkbox"
              name="Polkadot"
              onChange={(e) => {
                handleCoinCheckBox(e);
              }}
            ></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label htmlFor="Polkadot">Polkadot (DOT)</label>
          </div>
          <p>
            The initial price will be collected in United state dollars and will be converted to the
            value of these tokens at an average standard rate in market.
          </p>
          <label>Price</label>
          <input
            type="text"
            name="PlanPrice"
            placeholder="$ xx.xx"
            onChange={(e) => {
              handlePlanListUpdate("price", e.target.value);
            }}
          />
          <p>This field only accept numbers with two decimals</p>
        </div>
      </form>
    </section>
  );
}
