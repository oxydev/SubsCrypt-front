import React, { useContext } from "react";
import { UserContext } from "../../../context/store";

//The component for generating provider dashboard header where the provider main info is shown
export default function ProviderHeader() {
  const { globalState } = useContext(UserContext);
  const user = globalState.user;
  // console.log(user);
  return (
    <section className="ProviderHeader">
      <div>
        <div className="ProviderHeader-identity">
          <div className="ProviderHeader-profileImage">
            <img
              src={
                "https://api.subscrypt.io/profile/getProviderPic/" +
                user.address
              }
            />
          </div>
          <h2 className="ProviderHeader-name">
            {user.name ? user.name : "Loading..."}
          </h2>
          <p className="ProviderHeader-Description">
            {user.description ? user.description : "Loading..."}
          </p>
        </div>
        <div className="ProviderHeader-trade">
          <div className="PlanPart-featureBox">
            <h2>Total Income:</h2>
            <p className="ProviderHeader-income">
              {user.income || user.income === 0
                ? user.income / Math.pow(10, 12)
                : "Loading..."}{" "}
              <span>SubC</span>
            </p>
          </div>
          <div className="PlanPart-featureBox">
            <h2>Total Users:</h2>
            <p className="TotalUsers">
              {user.usersCount || user.usersCount === 0
                ? user.usersCount
                : "Loading..."}
            </p>
          </div>
          <div className="PlanPart-featureBox">
            {/*<span>Net income converted to todays conversation rate via Coinmarketcap.com </span>*/}
          </div>
        </div>
      </div>
    </section>
  );
}
