import React, { useContext } from "react";
import { UserContext } from "../../../context/store";

export default function ProviderHeader(props) {
  const { globalState, dspatch } = useContext(UserContext);
  const user = globalState.user;
  const plans = globalState.plans;
  console.log(user);
  return (
    <section className="ProviderHeader">
      <div>
        <div className="ProviderHeader-identity">
          <div className="ProviderHeader-profileImage">
            <img src={user.image} />
          </div>
          <h2 className="ProviderHeader-name">{user.name ? user.name : "Loading..."}</h2>
          <p className="ProviderHeader-Description">
            {user.description ? user.description : "Loading..."}
          </p>
        </div>
        <div className="ProviderHeader-trade">
          <div className="PlanPart-featureBox">
            <h2>Total Income:</h2>
            <p className="ProviderHeader-income">
              {user.income ? user.income : "0000"} <span>DOT</span>
            </p>
          </div>
          <div className="PlanPart-featureBox">
            <h2>Total Users:</h2>
            <p className="TotalUsers">{user.userCount ? user.userCount : "00"}</p>
          </div>
          <div className="PlanPart-featureBox">
            <span>Net income converted to todays conversation rate via Coinmarketcap.com </span>
          </div>
        </div>
      </div>
    </section>
  );
}