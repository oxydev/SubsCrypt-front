import { useRouter } from "next/router";
import React, { useContext } from "react";
import userData from "../../data/userIdentity.json";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import Cookies from "js-cookie";
import { middleDots } from "../../utilities/utilityFunctions";

export default function Header() {
  const user = userData.none;
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);

  const userName = globalState.user.username;
  const userWallet = globalState.user.userWallet;

  function handleLogOut() {
    Cookies.remove("subscrypt");
    Cookies.remove("subscryptWallet");
    Cookies.remove("subscryptPass");
    Cookies.remove("subscryptType");
    Cookies.remove("addressIndex");
    setAuth(false);
    dispatch({
      type: "LOG_OUT",
      payload: {},
    });
    router.push("/");
  }

  return (
    <div className="Header">
      <div className={userName || userWallet ? "LoginBox" : "LoginBox Green"}>
        <img className="Avatar" src={user.avatar} />
        <p className="UserName">
          {userName
            ? "@ " + userName
            : userWallet
            ? middleDots(userWallet.address)
            : "Connect Wallet"}
        </p>
      </div>
      <div className="UserMenu" onClick={handleLogOut}>
        <div className="UserMenu-button"></div>
        <div className="UserMenu-menu"></div>
      </div>
    </div>
  );
}
