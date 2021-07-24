import React from "react";
import SubscryptionOffers from "../../componenets/user/subscryptionOffers";

export default function NewOffers(props) {
  return (
    <div className="userDashboard">
      <h1>We have new plans for offering to you</h1>
      <div className="row">
        <div className="Container--medium">
          <SubscryptionOffers />
        </div>
        <div className="Container--small"></div>
      </div>
    </div>
  );
}
