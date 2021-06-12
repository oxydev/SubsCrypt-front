import { useRouter } from "next/router";
import React, { useContext } from "react";
import userData from "../../data/userIdentity.json";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import Cookies from "js-cookie";

export default function Header() {
  const user = userData.none;
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);

  function handleLogOut() {
    Cookies.remove("subscrypt");
    Cookies.remove("subscryptWallet");
    Cookies.remove("subscryptPassword");
    Cookies.remove("subscryptType");
    setAuth(false);
    dispatch({
      type: "LOG_OUT",
      payload: {},
    });
    router.push("/");
  }
  return (
    <div className="Header">
      <div className="LoginBox">
        <img className="Avatar" src={user.avatar} />
        <p className="UserName">{user.name}</p>
      </div>
      <div className="UserMenu" onClick={handleLogOut}>
        <div className="UserMenu-button"></div>
        <div className="UserMenu-menu"></div>
      </div>
    </div>
  );
}
