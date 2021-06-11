import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import ProviderSignUp from "./provider/providerSignUp";
import { authContext } from "./_app";

export default function Login() {
  const [role, setRole] = useState("none");
  const { setAuth } = useContext(authContext);
  const router = useRouter();

  // useEffect(() => {
  //   console.log("login");
  //   router.replace("/login");
  // }, []);

  function handleUserLogin() {
    console.log("user");
    setAuth(true);
    router.push("/user/userLogin");
  }

  function handleProviderLogin() {
    console.log("provider");
    setAuth(true);
    router.push("/provider/providerLogin");
  }

  function handleProviderSignUp() {
    console.log("SignUp");
    setAuth(true);
    router.push("/provider/providerSignUp");
  }

  return (
    <section className="MainLoginPage">
      {/* <WalletConnection />
        <LoginPart /> */}
      <h1>Choose your role to login</h1>
      <button onClick={handleUserLogin}>Login as a User</button>
      <button onClick={handleProviderLogin}>Login as a Provider</button>
      <button onClick={handleProviderSignUp}>Sign Up as a Provider</button>
    </section>
  );
}
