import React from "react";
import plans from "../../../data/sunscryptionPlans.json";
import UserPlanCard from "./userPlanCard";

export default function UserPlansList(props) {
  const userPlans = plans.userPlans.map((plan) => <UserPlanCard plan={plan} />);
  return <div className="UserPlansList">{userPlans}</div>;
}
