import { useState } from "react";
import PercentSlider from "../../gadjets/percetageSlider";
import TagInput from "../../gadjets/tagInput";
import * as utils from "../../../utilities/utilityFunctions";

export const PlansDetailsModal = (props) => {
  const { plan } = props;
  const [planInfo, setplanInfo] = useState({
    title: plan.name,
    description: plan.description,
    duration: utils.duration(parseInt(plan.duration.replace(/,/g, ""))),
    refundValue: plan.max_refund_permille_policy,
    price: parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12),
    characteristics: plan.characteristics.map((item) => ({ id: item, text: item })),
  });
  const [refundValue, setRefundValue] = useState(plan.max_refund_permille_policy);

  const handleplanInfoUpdate = (key, value) => {
    planInfo[key] = value;
    setplanInfo({ ...planInfo });
  };

  console.log(planInfo);
  return (
    <section className="PlanDetailsModal">
      <h1>Plan Details</h1>
      <div className="PlanForm">
        <div>
          <label htmlFor="PlanTitle">Plan Title</label>
          <input
            type="text"
            name="PlanTitle"
            required
            minLength={3}
            value={planInfo.title}
            placeholder="e.g. One Month of Premium Membership"
            onChange={(e) => {
              handleplanInfoUpdate("title", e.target.value);
            }}
          />
          <p>Short and specific title of the plan</p>
          <label htmlFor="PlanDescription">Plan Description</label>
          <input
            type="text"
            name="PlanDescription"
            required
            minLength={3}
            value={planInfo.description}
            placeholder="Information about the plan"
            onChange={(e) => {
              handleplanInfoUpdate("description", e.target.value);
            }}
          />
          <p>Short and specific details of the plan</p>

          <label>Special Charactristics of the plan</label>
          <div className="PlansForm-tag">
            <TagInput initailTags={planInfo.characteristics} handleChange={handleplanInfoUpdate} />
          </div>
          <p>Some characteristics your plan may have e.g. Country, Region and etc.</p>
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="PlanPrice"
            required
            value={planInfo.price + " DOT"}
            placeholder="DOT xx.xx"
            onChange={(e) => {
              handleplanInfoUpdate("price", e.target.value);
            }}
          />
          <p>This field only accept numbers with two decimals</p>
          <label>Refund Policy</label>
          <div className="PlansForm-refund">
            <PercentSlider
              callBack={handleplanInfoUpdate}
              value={refundValue}
              handleChange={setRefundValue}
            />
          </div>
          <p>
            Users can refund <span>{refundValue} percent</span> of the plan at any time.
          </p>
          <label>Plan Duration</label>
          <select
            type="text"
            name="PlanDuration"
            placeholder="Select Duration of Plan"
            value={planInfo.duration}
            onChange={(e) => {
              handleplanInfoUpdate("duration", e.target.value);
            }}
            s
          >
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
          </select>
          <p>Select from the list</p>
        </div>
      </div>
      <div className="PlanDetailsModal-footer">
        <p>
          For signing up you need to send a transaction on chain to put the data in smart contract
          on blockchain. Normal gas fee applies.
        </p>
        <button>Edit</button>
      </div>
    </section>
  );
};
