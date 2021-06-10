import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import ProviderSignUp from "./provider/providerSignUp";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState("none");

  // useEffect(() => {
  //   console.log("login");
  //   router.replace("/login");
  // }, []);

  function handleUserLogin() {
    console.log("user");
    setRole("user");
  }

  function handleProviderLogin() {
    console.log("provider");
    setRole("provider");
  }

  function handleProviderSignUp() {
    console.log("SignUp");
    setRole("signUp");
  }

  if (role == "none") {
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
  } else if (role == "user") {
    return <UserLogin />;
  } else if (role == "provider") {
    return <ProviderLogin />;
  } else if (role == "signUp") {
    return <ProviderSignUp />;
  }
}
