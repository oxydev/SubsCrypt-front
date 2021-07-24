import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/store";
import { loadingContext } from "../_app";
import SubscryptionOffers from "../../componenets/user/subscryptionOffers";
import UserPlansList from "../../componenets/user/userPlansList";
const subscrypt = import("@oxydev/subscrypt");

export default function UserHome() {
  const { globalState, dispatch } = useContext(UserContext);
  const plans = globalState.plans;

  return (
    <div className="userDashboard">
      <h1>My Subscryption</h1>
      <div className="row">
        <div className="Container--medium">
          {plans.length > 0 ? <UserPlansList /> : <SubscryptionOffers />}
        </div>
        <div className="Container--small"></div>
      </div>
    </div>
  );
}
