import { useContext, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import ProviderSignUp from "./provider/providerSignUp";
import { authContext } from "./_app";
import { dataContext } from "../context/getData";
import Cookies from "js-cookie";

export default function Login() {
  const [role, setRole] = useState("none");
  const { checkAuthByCookie } = useContext(dataContext);
  const { auth } = useContext(authContext);

  //get coockies
  const password = Cookies.get("subscryptPass");
  const userWallet = Cookies.get("subscryptWallet");

  function handleUserLogin() {
    setRole("user");
  }

  function handleProviderLogin() {
    setRole("provider");
  }

  function handleProviderSignUp() {
    setRole("providerSignUp");
  }

  //Check the cookies and auth if cokkies are set
  if (!auth && (password || userWallet)) {
    checkAuthByCookie();
  }

  if (role == "none") {
    return (
      <section className="MainLoginPage">
        {/* <WalletConnection />
        <LoginPart /> */}
        <h1>Choose your role to login</h1>
        <div>
          <button onClick={handleUserLogin}>Login as a User</button>
          <button onClick={handleProviderLogin}>Login as a Provider</button>
          <button onClick={handleProviderSignUp}>Sign Up as a Provider</button>
        </div>
      </section>
    );
  } else if (role == "user") {
    return <UserLogin />;
  } else if (role == "provider") {
    return <ProviderLogin />;
  } else if (role == "providerSignUp") {
    return <ProviderSignUp />;
  }
}
