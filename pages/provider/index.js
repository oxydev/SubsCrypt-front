import React, { useContext, useEffect } from "react";
import ProviderDashboard from "./providerDashboard";
import { UserContext } from "../../context/Store";
import { useRouter } from "next/router";

export default function ProviderHome() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const registerStatus = globalState.user.registered;

  //navigate to the provider sign up page if not registered
  useEffect(() => {
    if (!registerStatus) {
      router.push("/provider/providerSignUp");
    } else {
      router.push("/provider/providerDashboard");
    }
  });

  return <div>{/* <ProviderDashboard /> */}</div>;
}
