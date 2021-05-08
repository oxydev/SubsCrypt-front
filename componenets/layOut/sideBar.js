import React from "react";
import Link from "next/link";
import data from "../../data/sideBar.json";

const sideBarMenuItems = data.sideBar.menuItem.map((item) => (
  <li>
    <Link href={item.url}>
      <a>{item.name}</a>
    </Link>
  </li>
));

export default function SideBar() {
  return (
    <div className="SideBar">
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </div>
  );
}
