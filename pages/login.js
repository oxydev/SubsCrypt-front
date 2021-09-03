import { useContext, useEffect, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import { authContext } from "./_app";
import { dataContext } from "../context/getData";
import Cookies from "js-cookie";
import WalletConnection from "../componenets/login/walletConnection";
import {SignWallet} from "../styles/wallet"
import styled from "styled-components";
import {
  FontSize,
  Weight,
  Primary,
  BorderRadius,
  Gray,
} from "../styles/variables";

const MainLoginPage = styled.section`
   // width: 441px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  & >h1 {
    font-size: ${FontSize.fontSizeHeading3};
    font-weight: ${Weight.fontWeightBold};
    color: ${Primary.primary};
    line-height: 1.4rem;
    margin-bottom: 40px;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  button {
    outline: none;
    border: 1px solid ${Gray.gray5};
    border-radius: ${BorderRadius.borderRadiusRegular};
    background-color: transparent;
    padding: 7px 20px 9px;
    margin-bottom: 10px;
    font-size: ${FontSize.fontSizeBodySmall};
    font-weight: ${Weight.fontWeightRegular};
    line-height: 1.4rem;
    color: #8a8f99;
  }
}
`;

//This is the login page which consists of a menu for selecting the user part and navigate to the related login menu according to the type
export default function Login() {
  const [role, setRole] = useState("none");
  const { checkAuthByCookie, sendMoneyToAddress } = useContext(dataContext);
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

  function hanadleGetToken() {
    sendMoneyToAddress();
  }

  useEffect(() => {
    //Check the cookies and authentication if cokkies are set
    if (!auth && (password || userWallet)) {
      checkAuthByCookie();
    }

    //change the status by clicking on sidebar links
    const mainLoginLink = document.getElementById("PublicDashboard");
    const userLoginLink = document.getElementById("PublicUser");
    const providerLoginLink = document.getElementById("PublicProvider");
    const signUpLink = document.getElementById("publicSignUp");
    const giveTokenLink = document.getElementById("giveSomeToken");

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

    giveTokenLink.onclick = hanadleGetToken;
  });

  //change the login menu according to selecting each type
  if (role == "none") {
    return (
      <MainLoginPage className="MainLoginPage">
        <h1>Choose your role to login</h1>
        <div>
          <button onClick={handleUserLogin}>Login as a User</button>
          <button onClick={handleProviderLogin}>Login as a Provider</button>
          <button onClick={handleProviderSignUp}>Sign Up as a Provider</button>
          <button onClick={hanadleGetToken}>Give me some token</button>
        </div>
      </MainLoginPage>
    );
  } else if (role == "user") {
    return <UserLogin />;
  } else if (role == "provider") {
    return <ProviderLogin />;
  } else if (role == "providerSignUp") {
    return (
      <SignWallet className="SignUp-walletConnection">
        <WalletConnection type="provider" />
      </SignWallet>
    );
  }
}
