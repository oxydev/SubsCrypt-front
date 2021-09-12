import React, { useContext } from "react";
import { UserContext } from "../../../context/store";
import styled from "styled-components";

const Header = styled.section`
  &.ProviderHeader {
    margin-bottom: 56px;
    & > h1 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 19px;
    }

    & > div {
      padding: 17px 0 34px;
      display: flex;
    }
  }

  .ProviderHeader-identity {
    display: flex;
    flex-direction: column;
    width: 50%;
    border-right: 1px solid ${({ theme }) => theme.Gray.gray5};
    padding-right: 40px;
    h2 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 11px;
    }
    p {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5;
    }
  }

  .ProviderHeader-profileImage {
    border-radius: 50%;
    width: 128px;
    height: 128px;
    display: block;
    overflow: hidden;
    margin-bottom: 19px;
    background-color: ${({ theme }) => theme.Gray.gray4};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .ProviderHeader-trade {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    padding-left: 40px;
  }

  .PlanPart-featureBox {
    h2 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5;
      font-weight: 600;
    }
    p {
      font-size: ${({ theme }) => theme.FontSize.fontSizeTitleLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
    }
    span {
      font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
    }

    .ProviderHeader-income {
      font-size: ${({ theme }) => theme.FontSize.fontSizeHeading3};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      span {
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
        font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
        line-height: 1.4;
        color: ${({ theme }) => theme.Gray.gray3};
      }
    }
  }
`;

//The component for generating provider dashboard header where the provider main info is shown
export default function ProviderHeader() {
  const { globalState } = useContext(UserContext);
  const user = globalState.user;
  // console.log(user);
  return (
    <Header className="ProviderHeader">
      <div>
        <div className="ProviderHeader-identity">
          <div className="ProviderHeader-profileImage">
            <img src={"https://api.subscrypt.io/profile/getProviderPic/" + user.address} />
          </div>
          <h2 className="ProviderHeader-name">{user.name ? user.name : "Loading..."}</h2>
          <p className="ProviderHeader-Description">
            {user.description ? user.description : "Loading..."}
          </p>
        </div>
        <div className="ProviderHeader-trade">
          <div className="PlanPart-featureBox">
            <h2>Total Income:</h2>
            <p className="ProviderHeader-income">
              {user.income || user.income == 0 ? user.income / Math.pow(10, 12) : "Loading..."}{" "}
              <span>DOT</span>
            </p>
          </div>
          <div className="PlanPart-featureBox">
            <h2>Total Users:</h2>
            <p className="TotalUsers">
              {user.usersCount || user.usersCount == 0 ? user.usersCount : "Loading..."}
            </p>
          </div>
          <div className="PlanPart-featureBox">
            {/*<span>Net income converted to todays conversation rate via Coinmarketcap.com </span>*/}
          </div>
        </div>
      </div>
    </Header>
  );
}
