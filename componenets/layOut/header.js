import React, { useContext, useState } from "react";
import { UserContext } from "../../context/store";
import { handleDataContext } from "../../context/handleData";
import { middleDots } from "../../utilities/utilityFunctions";
import Link from "next/link";

//The component for generating page header
export default function Header() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(handleDataContext);
  const [showMenu, setShownMenu] = useState(false);

  const userName = globalState.user.username;
  const userWallet = globalState.user.address;

  return (
    <div className="Header">
      <div className={userName || userWallet ? "LoginBox" : "LoginBox Green"}>
        <img className="Avatar" src={"/avatar/notLogedin.svg"} />
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
