import React, { useContext } from "react";
import ProviderDashboard from "./providerDashboard";
import { UserContext } from "../../context/store";
import { loadUserData } from "../../dataFunctions/getData";

export default function ProviderHome() {
  const { globalState, dispatch } = useContext(UserContext);

  const user = globalState.user;
  if (!globalState.plans) {
    loadUserData(user.username, user.password, dispatch);
  }

  return (
    <div>
      <ProviderDashboard />
    </div>
  );
}
