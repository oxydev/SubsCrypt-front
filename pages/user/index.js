import React, { useContext } from "react";
import { UserContext } from "../../context/Store";
import SubscryptionOffers from "../../componenets/user/subscryptionOffers";
import UserPlansList from "../../componenets/user/userPlansList";
import {UDashboard} from "../../styles/pageStyle"

export default function UserHome() {
  const { globalState } = useContext(UserContext);
  const plans = globalState.plans;

  // show the user plan list. If there is no plans, it will switch to the offers
  return (
    <UDashboard className="userDashboard">
      <h1>My Subscryption</h1>
      <div className="row">
        <div className="Container--medium">
          {plans.length > 0 ? <UserPlansList /> : <SubscryptionOffers />}
        </div>
        <div className="Container--small"></div>
      </div>
    </UDashboard>
  );
}
