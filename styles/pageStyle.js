import styled from "styled-components";
import {
  Primary,
  FontSize,
  Weight,
  Gray,
  Color,
  Background,
  Shadows,
  BorderRadius,
} from "../styles/variables";

export const Providerstyled = styled.section`
  &.ProviderSignUp {
    padding-top: 73px;
    & > h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 51px;
      margin-top: 60px;
    }
  }
  .PlansForm-addBtn {
    font-size: ${FontSize.fontSizeBodyStandard};
    font-weight: ${Weight.fontWeightRegular};
    color: ${Primary.primary};
    line-height: 1.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 66px;

    &::before {
      content: "";
      display: block;
      width: 42px;
      height: 42px;
      background-position: center;
      background-size: contain;
      background-image: url("/icons/png/uploadBtn.png");
      position: static;
      margin-right: 24px;
    }
  }
  .ProviderRegisteration {
    border-top: 1px solid ${Gray.gray5};
    padding-top: 32px;
    margin-bottom: 446px;
    display: flex;
    align-items: center;
    p {
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightRegular};
      line-height: 1.4rem;
      color: ${Gray.gray4};
      margin-right: 48px;
    }
    .RegisterBtn {
      width: 260px;
      height: 40px;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 40 / 2;
      background: ${Background.purpleBGLinear};
      border: none;
      outline: none;
      font-size: ${FontSize.fontSizeBodyVerySmall};
      font-weight: ${Weight.fontWeightRegular};
      line-height: 1.4rem;
      color: ${Color.white};
      &:hover {
        box-shadow: ${Shadows.boxShadowCard};
      }
      border-radius: ${BorderRadius.$borderRadiusSmall};
      font-size: ${FontSize.fontSizeBodyStandard};
      font-weight: ${Weight.fontWeightRegular};
      cursor: pointer;
    }
  }
`;

export const Setting = styled.section`
  &.ProfileSetting {
    padding-top: 73px;
    h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 60px;
    }
  }
  .ResetPassword {
    h2 {
      font-size: ${FontSize.fontSizeBodyLarge};
      font-weight: ${Weight.fontWeightRegular};
      color: ${Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 30px;
    }
    form {
      input[type="password"] {
        width: 100%;
        height: 48px;
        line-height: 4.8rem;
        border: 1px solid #c4c7cc;
        border-radius: ${BorderRadius.borderRadiusRegular};
        margin-bottom: 23px;
        padding: 0 26px;
        font-size: ${FontSize.fontSizeBodySmall};
        font-weight: ${Weight.fontWeightRegular};
        color: ${Primary.primary};
        &::placeholder {
          color: ${Gray.gray5};
        }
      }
      input[type="submit"] {
        width: 100%;
        height: 48px;
        line-height: 4.8rem;
        border-radius: ${BorderRadius.borderRadiusRegular};
        margin-bottom: 23px;
        padding: 0 26px;
        font-size: ${FontSize.fontSizeBodySmall};
        color: ${Primary.primary};
        &::placeholder {
          color: ${Gray.gray5};
        }
        background-color: ${Color.green};
        color: ${Color.white};
        font-weight: bold;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export const PDashboard = styled.section`
  &.ProviderDashboard {
    padding-top: 73px;
    padding-bottom: 454px;

    & > h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 35px;
    }
  }
`;

export const UDashboard = styled.div`
  &.userDashboard {
    padding-top: 73px;
    & > h1 {
      font-size: ${FontSize.fontSizeHeading2};
      font-weight: ${Weight.fontWeightBold};
      color: ${Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 48px;
    }
  }
`;

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
`;
