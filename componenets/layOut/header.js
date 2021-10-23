import React, { useContext, useState } from "react";
import userData from "../../data/userIdentity.json";
import { UserContext } from "../../context/store";
import { handleDataContext } from "../../context/handleData";
import { middleDots } from "../../utilities/utilityFunctions";
import Link from "next/link";

//The component for genrating page header
export default function Header() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(handleDataContext);
  const [showMenu, setShownMenu] = useState(false);

  const userName = globalState.user.username;
  const userWallet = globalState.user.address;

  return (
    <div className="Header">
      <div className={userName || userWallet ? "LoginBox" : "LoginBox Green"}>
        {/* <img className="Avatar" src={user.avatar} /> */}
        {/* show each of user name or wallet address or both of them */}
        {userName && <p className="UserName">{userName}</p>}
        {userName && userWallet && <p className="Separator">|</p>}
        {userWallet && <p className="UserWallet">{middleDots(userWallet)}</p>}
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
                  <a>Profile Setting</a>
                </Link>
              </li>
            )}
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
