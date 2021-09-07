import React, { useContext, useState } from "react";
import userData from "../../data/userIdentity.json";
import { UserContext } from "../../context/store";
import { dataContext } from "../../context/getData";
import { middleDots } from "../../utilities/utilityFunctions";
import Link from "next/link";
import styled from "styled-components";

const HeaderRoot = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.Gray.grayNotInKit1};
  width: 100%;
  padding: 24px 47px;
  .LoginBox {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.Color.green};
    border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
    padding: 0 23px;
    max-width: 355px;
    overflow: hidden;
    cursor: pointer;
    .Green {
      background-color: ${({ theme }) => theme.Color.green};
      .UserName {
        color: #fff;
      }
      img {
        display: none;
      }
    }
    .Avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-position: center;
      background-size: contain;
    }
    .UserName {
      line-height: 2.4rem;
      margin: 0 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      flex-shrink: 0;
      white-space: nowrap;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Color.green};
    }
    .Separator {
      line-height: 2.4rem;
      margin: 0 10px;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Color.green};
    }
    .UserWallet {
      line-height: 2.4rem;
      margin: 0 10px;
      flex-shrink: 0;
      white-space: nowrap;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Color.green};
    }
  }
  .UserMenu {
    margin-left: 12px;
    position: relative;
    .UserMenu-button {
      border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
      background: ${({ theme }) => theme.Background.lightBG};
      border: 1px solid ${({ theme }) => theme.Gray.grayNotInKit1};
      position: relative;
      width: 54px;
      height: 40px;
      cursor: pointer;

      ::after {
        background-image: url("/icons/png/userMenuBtn.png");
        content: "";
        display: block;
        position: absolute;
        background-position: center;
        background-size: 20px;
        width: 100%;
        height: 100%;
      }
    }
    .UserMenu-menu {
      display: block;
      background-color: ${({ theme }) => theme.Color.white};
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
      border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
      padding: 14px;
      position: absolute;
      right: 0;
      top: 53px;
      width: 214px;

      ::after {
        @include pseudo();
        content: "";
        display: block;
        width: 214px;
        height: 20px;
        position: absolute;
        top: -20px;
        right: 0;
      }

      ul {
        padding: 0;
        list-style: none;

        li {
          padding: 9px 35px;
          font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
          font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
          line-height: 1.4rem;
          color: ${({ theme }) => theme.Gray.gray4};
          border-bottom: 1px solid ${({ theme }) => theme.Gray.gray5};
        }
        li:last-child {
          border-bottom: none;
        }
      }

      &.hidden {
        display: none;
      }
    }
  }
`;

//The component for genrating page header
export default function Header() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(dataContext);
  const [showMenu, setShownMenu] = useState(false);

  const userName = globalState.user.username;
  const userWallet = globalState.user.userWallet;

  return (
    <HeaderRoot className="Header">
      <div className={userName || userWallet ? "LoginBox" : "LoginBox Green"}>
        {/* <img className="Avatar" src={user.avatar} /> */}
        {/* show each of user name or wallet address or both of them */}
        {userName && <p className="UserName">{userName}</p>}
        {userName && userWallet && <p className="Separator">|</p>}
        {userWallet && (
          <p className="UserWallet">{middleDots(userWallet.address)}</p>
        )}
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
    </HeaderRoot>
  );
}
