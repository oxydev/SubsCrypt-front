import React, { useContext } from "react";
import Link from "next/link";
import data from "../../data/sideBar.json";
import { UserContext } from "../../context/store";
import { testDataContext } from "../../context/getDataTest";

//The component for generating the sidebar for each user according to his role as a provider or ordinary user
export default function SideBar() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(testDataContext);
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
      {item.url ? (
        <Link href={item.url}>
          <a
            id={item.id}
            onClick={
              item.name == "Log Out"
                ? () => {
                    handleLogOut();
                  }
                : () => {}
            }
          >
            {item.name}
          </a>
        </Link>
      ) : (
        <p
          id={item.id}
          onClick={
            item.name == "Log Out"
              ? () => {
                  handleLogOut();
                }
              : () => {}
          }
        >
          {item.name}
        </p>
      )}
    </li>
  ));
  return (
    <div className="SideBar">
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </div>
  );
}
