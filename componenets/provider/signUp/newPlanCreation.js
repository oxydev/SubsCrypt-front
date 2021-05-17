import React from "react";

export default function NewPlanCreation() {
  return (
    <section className="NewPlanCreation">
      <h1>Create a Subscryption Plan #1</h1>
      <form className="PlanForm">
        <div className="PlanForm-info">
          <label for="PlanTitle">Plan Title</label>
          <input type="text" name="PlanTitle" placeholder="e.g. One Month of Premium Membership" />
          <p>Short and specific title of the plan</p>
          <label for="PlanDescription">Plan Description</label>
          <input type="text" name="PlanDescription" placeholder="Information about the plan" />
          <p>Short and specific details of the plan</p>
          <label>Plan Duration</label>
          <select type="text" name="PlanDuration" placeholder="Select Duration of Plan">
            <option value="1">1 Month</option>
            <option vlaue="3">3 months</option>
            <option value="6">6 months</option>
          </select>
          <p>Select from the list</p>
          <label>Special Charactristics of the plan</label>
          <div className="PlansForm-tag"></div>
          <p>Some characteristics your plan may have e.g. Country, Region and etc.</p>
          <label>Refund Policy</label>
          <div className="PlansForm-refund"></div>
          <p>
            Users can refund <span>XX percent</span> of the plan at any time. Minimum amount is %70.
          </p>
        </div>
        <div className="PlanForm-financial">
          <label for="PlanTokens">Users can pay via these tokens</label>
          <div className="PlanForm-payCheckbox">
            <input type="checkbox" name="Polkadot"></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label for="Polkadot">Polkadot (DOT)</label>
          </div>
          <div className="PlanForm-payCheckbox">
            <input type="checkbox" name="Polkadot"></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label for="Polkadot">Polkadot (DOT)</label>
          </div>
          <div className="PlanForm-payCheckbox">
            <input type="checkbox" name="Polkadot"></input>
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <label for="Polkadot">Polkadot (DOT)</label>
          </div>
          <p>
            The initial price will be collected in United state dollars and will be converted to the
            value of these tokens at an average standard rate in market.
          </p>
          <label>Price</label>
          <input type="text" name="PlanPrice" placeholder="$ xx.xx" />
          <p>This field only accept numbers with two decimals</p>
        </div>
      </form>
      <button className="PlansForm-addBtn">Add another plan</button>
    </section>
  );
}
