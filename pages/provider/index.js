import React, { useContext } from "react";
import ProviderDashboard from "./providerDashboard";
import { UserContext } from "../../context/store";
import { useRouter } from "next/router";

export default function ProviderHome() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const registerStatus = globalState.user.registered;
  if (!registerStatus) {
    router.push("/provider/providerSignUp");
  }

  return (
    <div>
      <ProviderDashboard />
    </div>
  );
}
