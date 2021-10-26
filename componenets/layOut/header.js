import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/store";
import { handleDataContext } from "../../context/handleData";
import { middleDots } from "../../utilities/utilityFunctions";
import Link from "next/link";

//The component for generating page header
export default function Header() {
  const { globalState } = useContext(UserContext);
  const { handleWalletBalance, handleLogOut } = useContext(handleDataContext);
  const [showMenu, setShownMenu] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);

  const userName = globalState.user.username;
  const userWallet = globalState.user.address;
  const userBalance = globalState.user.balance;

  useEffect(() => {
    if (userWallet) {
      handleWalletBalance(userWallet);
    }
  }, [userWallet]);

  return (
    <div className="Header">
      <div
        className={userName || userWallet ? "LoginBox" : "LoginBox Green"}
        onMouseOver={() => {
          setShowIdentity(true);
        }}
        onMouseOut={() => {
          setShowIdentity(false);
        }}
      >
        <img className="Avatar" src={"/avatar/notLogedin.svg"} />
        {/* show each of user name or wallet address or both of them */}
        {userName && <p className="UserName">{userName}</p>}
        {userName && userWallet && <p className="Separator">|</p>}
        {userWallet && <p className="UserWallet">{middleDots(userWallet)}</p>}
        <div
          className={showIdentity ? "UserMenu-menu" : "UserMenu-menu hidden"}
        >
          <ul>
            {userName && (
              <li>
                <p>
                  <embed src={"/icons/png/sideBar/user.svg"} />
                  {userName}
                </p>
              </li>
            )}
            {userBalance && (
              <li>
                <p>
                  <embed src={"/icons/png/sideBar/balance.svg"} />
                  <b>{userBalance.toFixed(2)}</b> <span>USDT</span>
                </p>
              </li>
            )}
            {userWallet && (
              <li>
                <p>
                  <embed src={"/icons/png/sideBar/wallet.svg"} />
                  {middleDots(userWallet)}
                </p>
              </li>
            )}

            {/* {globalState.user.username && (
              <li>
                <Link
                  href={
                    globalState.user.type === "user"
                      ? "/user/profilesetting"
                      : "/provider/profilesetting"
                  }
                >
                  <a>
                    {" "}
                    <embed src={"/icons/png/sideBar/setting-black.svg"} />
                    Profile Setting
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Link href="#">
                <a onClick={handleLogOut}>
                  <embed src={"/icons/png/sideBar/logout-black.svg"} />
                  LogOut
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div
        className="UserMenu"
        onMouseOver={() => {
          setShownMenu(true);
        }}
        onMouseOut={() => {
          setShownMenu(false);
        }}
      >
        <div className="UserMenu-button"></div>
        <div className={showMenu ? "UserMenu-menu" : "UserMenu-menu hidden"}>
          <ul>
            {globalState.user.username && (
              <li>
                <Link
                  href={
                    globalState.user.type === "user"
                      ? "/user/profilesetting"
                      : "/provider/profilesetting"
                  }
                >
                  <a>
                    {" "}
                    <embed src={"/icons/png/sideBar/setting-black.svg"} />
                    Profile Setting
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Link href="#">
                <a onClick={handleLogOut}>
                  <embed src={"/icons/png/sideBar/logout-black.svg"} />
                  LogOut
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
