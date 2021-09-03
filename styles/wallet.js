import styled from "styled-components";
import {
  Primary,
  FontSize,
  Weight,
  Gray,
  BorderRadius,
  Shadows,
  Color,
} from "./variables";

export const ConnectionPart = styled.section`
  &.WalletConnection {
    width: 441px;
    h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 1.5;
      margin-bottom: 80px;
      text-align: center;
    }
    h2 {
      @include text-body--small--regular;
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      line-height: 28px;
      margin-bottom: 8px;
      color: #8a8f99;
    }
  }

  & > .Networks,
  .Wallets {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 9px;
  }
`;

export const Button = styled.div`
  &.WalletButton {
    min-width: 207px;
    border: 1px solid ${Gray.grayNotInKit1};
    border-radius: ${BorderRadius.borderRadiusRegular};
    padding: 7px 20px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    cursor: pointer;

    p {
      @include text-body--small--regular;
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      line-height: 1.4;
      color: #8a8f99;
      margin-left: 16px;
      min-width: 100px;
    }

    &.active {
      box-shadow: ${Shadows.boxShadow};
    }
  }
  .WalletButton-ImageContainer {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    position: relative;
    img {
      border-radius: 50%;
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }
  & > .active .WalletButton-ImageContainer {
    &::after {
      content: "";
      display: block;
      position: absolute;
      background-position: center;
      background-size: contain;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-image: url("/icons/png/check.png");
      bottom: -4px;
      right: -4px;
    }
  }
`;

export const SignWallet = styled.div`
  &.SignUp-walletConnection {
    padding-top: 50px;
  }
`;

export const LogIn = styled.section`
  &.Login {
    margin: 24px auto 50px;
    width: 441px;
    h6 {
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      line-height: 1.4;
      color: #000;
    }
    h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 69px;
    }
    p {
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      line-height: 1.4;
      color: ${Gray.gray3};
      margin-bottom: 21px;
    }
    form {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    input {
      width: 100%;
      height: 48px;
      line-height: 4.8rem;
      border: 1px solid #c4c7cc;
      border-radius: ${BorderRadius.borderRadiusRegular};
      margin-bottom: 23px;
      padding: 0 26px;
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      &::placeholder {
        color: ${Gray.gray5};
      }
    }
    input[type="submit"] {
      border: none;
      background-color: ${Color.green};
      @include text-body--large--medium;
      font-size: ${FontSize.fontSizeBodyLarge};
      font-weight: ${Weight.fontWeightMedium};
      line-height: 1.4;
      color: #fff;
      margin: 28px 0 0;
    }
    &>.LoginError {
      color: red;
      position: absolute;
      top: 130px;
    }
  }
`;
