import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/store";
import { authContext } from "../_app";
import { loadUserData } from "../../dataFunctions/getData";
import SubscryptionOffers from "../../componenets/user/userSubscryption/subscryptionOffers";
import UserPlansList from "../../componenets/user/userSubscryption/userPlansList";

export default function UserHome() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);

  const user = globalState.user;

  const plans = globalState.plans;

  return (
    <div className="userDashboard">
      <h1>My Subscryption</h1>
      <div className="row">
        <div className="Container--medium">
          {plans ? <UserPlansList /> : <SubscryptionOffers />}
        </div>
        <div className="Container--small"></div>
      </div>
    </div>
  );
}
