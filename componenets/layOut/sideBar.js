import React, { useContext } from "react";
import Link from "next/link";
import data from "../../data/sideBar.json";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";

export default function SideBar() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(dataContext);
  const type = globalState.user.type;
  let sideBarData;
  if (type == "user") {
    sideBarData = data.UserSideBar;
  } else if (type == "provider") {
    sideBarData = data.ProviderSideBar;
  } else {
    sideBarData = data.PublicSideBar;
  }
  const sideBarMenuItems = sideBarData.menuItem.map((item) => (
    <li key={item.name}>
      <Link href={item.url}>
        <a
          onClick={
            item.name == "Log Out"
              ? () => {
                  handleLogOut();
                }
              : JSON.stringify(item.func)
          }
        >
          {item.name}
        </a>
      </Link>
    </li>
  ));
  return (
    <div className="SideBar">
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </div>
  );
}
