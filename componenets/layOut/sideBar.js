import React, { useContext } from "react";
import Link from "next/link";
import data from "../../data/sideBar.json";
import { handleDataContext } from "../../context/handleData";

import { UserContext } from "../../context/Store";
import styled from "styled-components";

const SideRoot = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.Primary.primary};
  height: 100vh;
  align-items: center;
  & .SideBarNav {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    color: ${({ theme }) => theme.Gray.gray4};
    line-height: 2.8rem;
    list-style: none;
    margin: 175px auto auto;
    li {
      margin: 19px 0;
      cursor: pointer;
    }
  }
  & .SideBar-logo {
    margin: auto auto 61px;
  }
`;

//The component for generating the sidebar for each user according to his role as a provider or ordinary user
export default function SideBar() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(handleDataContext);
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
    <SideRoot className="SideBar">
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </SideRoot>
  );
}
