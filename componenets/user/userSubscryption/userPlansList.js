import React, { useContext } from "react";
import plans from "../../../data/sunscryptionPlans.json";
import UserPlanCard from "./userPlanCard";
import { UserContext } from "../../../context/store";

export default function UserPlansList(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const plansData = globalState.plans;

  const userPlans = plans.userPlans.map((plan) => <UserPlanCard key={plan.name} plan={plan} />);
  return <div className="UserPlansList">{userPlans}</div>;
}
