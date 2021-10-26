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
        <img className="Avatar" src={"/icons/png/networks/wallet.png"} />
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
            {(userBalance || userBalance === 0) && (
              <li>
                <p>
                  <embed src={"/icons/png/sideBar/balance.svg"} />
                  <b>{userBalance.toFixed(2)}</b> <span>Dot</span>
                </p>
              </li>
            )}
            {userWallet && (
              <li>
                <p>
                  <embed src={"/icons/png/networks/wallet.png"} />
                  {middleDots(userWallet)}
                </p>
              </li>
            )}
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
        <div className="UserMenu-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#828282"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.3011 11.7708H11.8738V18.1424C11.8738 19.1683 11.0349 20 10 20C8.96513 20 8.1262 19.1683 8.1262 18.1424V11.7708H1.69886C0.733557 11.6717 0 10.8654 0 9.9033C0 8.94125 0.733557 8.13486 1.69886 8.03576H8.10605V1.68413C8.20601 0.727196 9.01946 0 9.98993 0C10.9604 0 11.7738 0.727196 11.8738 1.68413V8.03576H18.3011C19.2664 8.13486 20 8.94125 20 9.9033C20 10.8654 19.2664 11.6717 18.3011 11.7708Z" />
          </svg>
        </div>
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
