import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/store";
import SubscryptionOffers from "../../componenets/user/userSubscryption/subscryptionOffers";
import UserPlansList from "../../componenets/user/userSubscryption/userPlansList";
import { loadUserData } from "../../dataFunctions/userDataFunctions";
import { loadUserDataByWallet } from "../../dataFunctions/userDataFunctions";

export default function UserHome() {
  const { globalState, dispatch } = useContext(UserContext);
  const plans = globalState.plans;
  const password = globalState.user.password;
  const userWallet = globalState.user.userWallet;
  const userName = globalState.user.username;

  useEffect(() => {
    if (password) {
      loadUserData(userName, password, dispatch);
    } else if (userWallet) {
      loadUserDataByWallet(userWallet.address, dispatch);
    }
  }, []);

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
