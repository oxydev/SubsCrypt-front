import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/store";
import { loadingContext } from "../_app";
import SubscryptionOffers from "../../componenets/user/userSubscryption/subscryptionOffers";
import UserPlansList from "../../componenets/user/userSubscryption/userPlansList";
const subscrypt = import("@oxydev/subscrypt");

export default function UserHome() {
  const { globalState, dispatch } = useContext(UserContext);
  const { loading, setLoading } = useContext(loadingContext);
  const plans = globalState.plans;
  const password = globalState.user.password;
  const userWallet = globalState.user.userWallet;
  const userName = globalState.user.username;

  //Function for getting the user plan data after loging in
  const loadUserData = async () => {
    // setLoading(true);
    await (await subscrypt).retrieveWholeDataWithUsername(userName, password).then((result) => {
      setLoading(false);
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    });
  };

  //Function for getting the user plan data after loging in
  const loadUserDataByWallet = async () => {
    // setLoading(true);
    await (await subscrypt).retrieveWholeDataWithWallet(userWallet.address).then((result) => {
      if (result.status == "Fetched") {
        setLoading(false);
        dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
      }
    });
  };

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
