import React, { useContext } from "react";
import UserPlanCard from "./userPlanCard";
import { UserContext } from "../../context/store";
import * as utils from "../../utilities/utilityFunctions";

//The component for generating the all plans list that a user has been subscripted to
export default function UserPlansList(props) {
  const { globalState } = useContext(UserContext);
  let plans = [];
  let activePlans = [];
  let expiredPlans = [];
  if (globalState.plans) {
    for (const item of globalState.plans) {
      const use = utils.usePercentage(
        parseInt(item.subscription_time.replace(/,/g, "")),
        parseInt(item.plan.duration.replace(/,/g, ""))
      );
      if (use == 100) {
        item.status = -1;
        expiredPlans.push(item);
      } else {
        item.status = use;
        activePlans.push(item);
      }
    }
  }
  expiredPlans.sort((plan1, plan2) => {
    return (
      parseInt(plan2.subscription_time.replace(/,/g, "")) -
      parseInt(plan1.subscription_time.replace(/,/g, ""))
    );
  });

  activePlans.sort((plan1, plan2) => {
    const use1 = utils.usePercentage(
      parseInt(plan1.subscription_time.replace(/,/g, "")),
      parseInt(plan1.plan.duration.replace(/,/g, ""))
    );
    const use2 = utils.usePercentage(
      parseInt(plan2.subscription_time.replace(/,/g, "")),
      parseInt(plan2.plan.duration.replace(/,/g, ""))
    );

    return use2 - use1;
  });

  plans = activePlans.concat(expiredPlans);

  const userPlans = plans.map((plan, index) => (
    <UserPlanCard key={index + plan.provider} plan={plan} index={index} />
  ));

  return <div className="UserPlansList">{userPlans}</div>;
}
