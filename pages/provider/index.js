import React, { useContext } from "react";
import ProviderDashboard from "./providerDashboard";
import { UserContext } from "../../context/store";
import { loadPlan } from "../../dataFunctions/getData";
import data from "../../data/testData/providerAddress.json";

export default function ProviderHome() {
  const { globalState, dispatch } = useContext(UserContext);

  return (
    <div>
      <ProviderDashboard />
    </div>
  );
}
