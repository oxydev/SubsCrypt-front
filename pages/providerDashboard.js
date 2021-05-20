import React from "react";
import ProviderPlansList from "../componenets/provider/dashboard/providerPlansList";
import TotalIncome from "../componenets/provider/dashboard/totalIncome";
import TransactionsList from "../componenets/provider/dashboard/transactionsList";

export default function ProviderDashboard(props) {
  return (
    <section className="ProviderDashboard">
      <h1>Provider Dashboard</h1>
      <div className="row">
        <div className="Container--medium">
          <TotalIncome />
          <ProviderPlansList />
          <TransactionsList />
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
