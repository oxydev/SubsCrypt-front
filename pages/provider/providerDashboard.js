import React from "react";
import ProviderPlansList from "../../componenets/provider/dashboard/providerPlansList";
import ProviderHeader from "../../componenets/provider/dashboard/providerHeader";
import ProviderAllUsers from "../../componenets/provider/dashboard/providerAllUsers";

export default function ProviderDashboard() {
  return (
    <section className="ProviderDashboard">
      <h1>Provider Dashboard</h1>
      <div className="row">
        <div className="Container--medium">
          <ProviderHeader />
          <ProviderPlansList />
          <ProviderAllUsers />
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
