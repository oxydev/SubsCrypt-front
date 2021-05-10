import React from "react";
import SubscryptionOffers from "../componenets/user/userSubscryption/subscryptionOffers";

export default function MySubscryptions() {
  return (
    <div className="userDashboard">
      <h1>My Subscryption</h1>
      <div className="row">
        <div className="Container--medium">
          <SubscryptionOffers />
        </div>
        <div className="Container--small"></div>
      </div>
    </div>
  );
}
