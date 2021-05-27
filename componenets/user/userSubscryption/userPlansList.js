import React, { useContext } from "react";
import plans from "../../../data/sunscryptionPlans.json";
import UserPlanCard from "./userPlanCard";
import { UserContext } from "../../../context/store";

export default function UserPlansList(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const plansData = globalState.plans;

  const provider = plansData[0].provider;

  async function testData() {
    const subscrypt = await import("@oxydev/subscrypt");
    // await subscrypt.getPlanData(provider, 0).then((result) => {
    //   console.log(result);
    // });
    // await subscrypt.getPlanCharacteristics(provider, 0).then((result) => {
    //   console.log(result);
    // });
  }

  testData();

  const userPlans = plans.userPlans.map((plan) => <UserPlanCard key={plan.name} plan={plan} />);
  return <div className="UserPlansList">{userPlans}</div>;
}
