import React, { useContext } from "react";
import UserPlanCard from "./userPlanCard";
import { UserContext } from "../../../context/store";

export default function UserPlansList(props) {
  const { globalState } = useContext(UserContext);
  let plans = [];
  if (globalState.plans) {
    plans.push(...globalState.plans);
  }

  const userPlans = plans.map((plan, index) => (
    <UserPlanCard key={plan.plan_index + plan.provider} plan={plan} index={index} />
  ));
  return <div className="UserPlansList">{userPlans}</div>;
}
