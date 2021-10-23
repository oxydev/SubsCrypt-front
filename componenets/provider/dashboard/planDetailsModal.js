import { useContext, useState } from 'react'
import PercentSlider from "../../gadjets/percetageSlider";
import TagInput from "../../gadjets/tagInput";
import * as utils from "../../../utilities/utilityFunctions";
import { setDataContext } from '../../../context/setData'
import { UserContext } from "../../../context/store";
import { operationContext } from '../../../context/handleUserOperation'

export const PlansDetailsModal = (props) => {
  const { plan, handleEditPlan, showResultToUser, getProviderAllInfo } = props;

  const [planInfo, setplanInfo] = useState({
    planIndex: plan.planIndex,
    title: plan.name,
    description: plan.description,
    duration: utils.duration(parseInt(plan.duration.replace(/,/g, ""))),
    refund: plan.max_refund_permille_policy / 10,
    price: parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12),
    characteristics: plan.characteristics.map((item) => ({ id: item, text: item })),
  });
  const { globalState } = useContext(UserContext);

  const [refundValue, setRefundValue] = useState(plan.max_refund_permille_policy / 10);
  const handleplanInfoUpdate = (key, value) => {
    planInfo[key] = value;
    setplanInfo({ ...planInfo });
  };
  const callback = async ({ events = [], status }) => {
    if (status.isInBlock) {
      let check = false;
      for (const { event: { data, method, section }, phase } of events) {
        if (method === "ExtrinsicSuccess") {
          check = true;

          var axios = require("axios");
          var config = {
            method: "patch",
            url: "https://api.subscrypt.io/profile/updateProductProfile",
            data: {
              providerAddress: globalState.user.address,
              planName: planInfo.title,
              planIndex: planInfo.planIndex,
              description: planInfo.description,
            },
            headers: {
              "Content-Type": `application/json`,
            },
            crossDomain: true,
          };

          axios(config)
            .then(async function (response) {
              if (response.status === 200) {
                //todo show modal
                await showResultToUser(
                  "Operation Successful!",
                  "The operation has been done successfully"
                );
              }
            })
            .catch(async function (error) {
              await showResultToUser("Operation failed!", "The operation has been failed!");
            });
        }
      }
      if (check == false) {
        await showResultToUser("Operation failed!", "The operation has been failed!");

        // await showResultToUser("Operation failed!", "The operation has been failed!");
      }
    }else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
      getProviderAllInfo(globalState.user.address);
    }
  }
  const prepareEditPlan = () => {
    const editedPlanData = {}
    editedPlanData['plan_index'] = planInfo.planIndex
    if (planInfo.duration === "1 Month") editedPlanData['duration'] = 30 * 24 * 60 * 60 * 1000;
    else if (planInfo.duration === "3 Months") editedPlanData['duration'] = 3 * 30 * 24 * 60 * 60 * 1000;
    else if (planInfo.duration === "6 Months") editedPlanData['duration'] = 6 * 30 * 24 * 60 * 60 * 1000;
    editedPlanData['price'] = planInfo.price * 1e12
    editedPlanData['max_refund_permille_policies'] = planInfo.refund * 10
    editedPlanData['disabled'] = false
    handleEditPlan(
      globalState.user.address,
      callback,
      editedPlanData
    ).catch(async () => {
      //todo
      await showResultToUser("Operation failed!", "The operation has been failed!");
    });
  }
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
            value={planInfo.price}
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
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
          </select>
          <p>Select from the list</p>
        </div>
      </div>
      <div className="PlanDetailsModal-footer">
        <p>
          For signing up you need to send a transaction on chain to put the data in smart contract
          on blockchain. Normal gas fee applies.
        </p>
        <button onClick={prepareEditPlan}>Edit</button>
      </div>
    </section>
  );
};
