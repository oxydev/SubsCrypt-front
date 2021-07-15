import React from "react";
import ProviderPlansList from "../../componenets/provider/dashboard/providerPlansList";
import ProviderHeader from "../../componenets/provider/dashboard/providerHeader";
import TransactionsList from "../../componenets/provider/dashboard/transactionsList";

export default function ProviderDashboard(props) {
  return (
    <section className="ProviderDashboard">
      <h1>Provider Dashboard</h1>
      <div className="row">
        <div className="Container--medium">
          <ProviderHeader />
          <ProviderPlansList />
          <TransactionsList />
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
