import React, { useContext, useState } from "react";
import PercentSlider from "../../gadjets/percetageSlider";
import TagInput from "../../gadjets/tagInput";
import { UserContext } from "../../../context/store";

//The component for handling new plan creation for provider user
export default function NewPlanCreation(props) {
  const { planList, setPlanList, index } = props;
  const plan = planList[index];
  const [refundValue, setRefundValue] = useState(plan.refund);
  const { globalState } = useContext(UserContext);
  const planNumber = globalState.providerPlans.length;

  //Function for handle plan form update
  function handlePlanListUpdate(key, value) {
    console.log(key, value);
    planList[index][key] = value;
    setPlanList([...planList]);
  }

  //function for handling checkbox status
  function handleCoinCheckBox(e) {
    // console.log(e.target.value);
    const status = e.target.checked;
    if (status) {
      planList[index].coins.push(e.target.value);
      setPlanList([...planList]);
    } else {
      let coinsIndex = planList[index].coins.indexOf(e.target.value);
      // console.log(coinsIndex);
      planList[index].coins.splice(coinsIndex, 1);
      setPlanList([...planList]);
    }
  }

  //function for handle minimizing or maximazing he forms
  function toggleVisibility() {
    const status = plan.visibility;
    if (status == "visible") {
      handlePlanListUpdate("visibility", "hidden");
    } else {
      handlePlanListUpdate("visibility", "visible");
    }
  }

  //function for removing the added plan form
  function removeThisPlan() {
    const list = planList;
    // console.log(index);
    list.splice(index, 1);
    setPlanList([...list]);
  }

  return (
    <section
      className={plan.visibility == "visible" ? "NewPlanCreation" : "NewPlanCreation hidden"}
    >
      <h1 onClick={toggleVisibility}>
        Create a Subscryption Plan #{index + planNumber + 1}
        <span></span>
        {planList.length > 1 && (
          <button
            className="RemovePlanBtn"
            onClick={(e) => {
              e.stopPropagation();
              removeThisPlan();
            }}
          ></button>
        )}
      </h1>
      <div className="PlanForm">
        <div className="PlanForm-info">
          <label htmlFor="PlanTitle">Plan Title</label>
          <input
            type="text"
            name="PlanTitle"
            required
            minLength={3}
            value={plan.title}
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
            required
            minLength={3}
            value={plan.description}
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
            value={plan.duration}
            onChange={(e) => {
              handlePlanListUpdate("duration", e.target.value);
            }}
          >
            <option value="1 m">1 Month</option>
            <option value="3 m">3 Months</option>
            <option value="6 m">6 Months</option>
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
            Users can refund <span>{refundValue} percent</span> of the plan at any time.
          </p>
          <label>Special Charactristics of the plan</label>
          <div className="PlansForm-tag">
            <TagInput initailTags={plan.characteristics} handleChange={handlePlanListUpdate} />
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
              checked
              disabled
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
            required
            value={plan.price}
            placeholder="DOT xx.xx"
            onChange={(e) => {
              handlePlanListUpdate("price", e.target.value);
            }}
          />
          <p>This field only accept numbers with two decimals</p>
        </div>
      </div>
    </section>
  );
}
