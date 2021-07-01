import React, { useContext } from "react";
import ProviderDashboard from "./providerDashboard";
import { UserContext } from "../../context/store";

export default function ProviderHome() {
  const { globalState, dispatch } = useContext(UserContext);

  return (
    <div>
      <ProviderDashboard />
    </div>
  );
}
