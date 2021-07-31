import { useContext, useEffect, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import { authContext } from "./_app";
import { dataContext } from "../context/getData";
import Cookies from "js-cookie";
import WalletConnection from "../componenets/login/walletConnection";

//This is the login page which consists of a menu for selecting the user part and navigate to the related login menu according to the type
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

  //Check the cookies and authentication if cokkies are set
  useEffect(() => {
    if (!auth && (password || userWallet)) {
      checkAuthByCookie();
    }
  });

  //change the status by clicking on sidebar links
  useEffect(() => {
    const mainLoginLink = document.getElementById("PublicDashboard");
    const userLoginLink = document.getElementById("PublicUser");
    const providerLoginLink = document.getElementById("PublicProvider");
    const signUpLink = document.getElementById("publicSignUp");

    mainLoginLink.onclick = () => {
      setRole("none");
    };

    userLoginLink.onclick = () => {
      setRole("user");
    };

    providerLoginLink.onclick = () => {
      setRole("provider");
    };

    signUpLink.onclick = () => {
      setRole("providerSignUp");
    };
  });

  //change the login menu according to selecting each type
  if (role == "none") {
    return (
      <section className="MainLoginPage">
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
    return (
      <div className="SignUp-walletConnection">
        <WalletConnection type="provider" />
      </div>
    );
  }
}
