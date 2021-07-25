import React, { useContext, useState } from "react";
import userData from "../../data/userIdentity.json";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import { middleDots } from "../../utilities/utilityFunctions";
import Link from "next/link";

export default function Header() {
  const user = userData.none;
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(dataContext);
  const [showMenu, setShownMenu] = useState(false);

  const userName = globalState.user.username;
  const userWallet = globalState.user.userWallet;

  return (
    <div className="Header">
      <div className={userName || userWallet ? "LoginBox" : "LoginBox Green"}>
        {/* <img className="Avatar" src={user.avatar} /> */}
        <p className="UserName">{userName ? "@ " + userName : "Connect Wallet"}</p>
        {userWallet && <p className="UserName">|</p>}
        {userWallet && <p className="UserName">{middleDots(userWallet.address)}</p>}
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
            <li>
              <Link
                href={
                  globalState.user.type == "user"
                    ? "/user/profilesetting"
                    : "/provider/profilesetting"
                }
              >
                <a>Profile Setting</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a onClick={handleLogOut}>LogOut</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
