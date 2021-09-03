import styled from "styled-components";
import {
  BorderRadius,
  Gray,
  FontSize,
  Weight,
  Primary,
  Background,
  Color,
  Shadows,
} from "./variables";

export const Root = styled.div`
  &.ModalContainer {
    z-index: 10;
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    min-width: 30vw;
    width: fit-content;
    height: fit-content;
    background-color: #fff;
    border-radius: ${BorderRadius.borderRadiusRegular};
    padding: 30px;
    &.hidden {
      display: none;
    }
    & > .Modal-closeBtn {
      display: block;
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      &::after,
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 15px;
        height: 2px;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        background-color: ${Gray.gray3};
        transform-origin: center;
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
`;

export const Filler = styled.div`
  &.Filler {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 5;
    background-color: #000;
    opacity: 0.5;

    &.hidden {
      display: none;
    }
  }
`;

export const Subscription = styled.section`
  &.SubscriptionModal {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h1 {
      font-size: ${FontSize.fontSizeBodyLarge};
      font-weight: ${Weight.fontWeightMedium};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 30px;
    }

    form {
      width: 100%;
    }
  }

  &.Modal-InputPart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 30vw;
    margin: 20px 0;

    label {
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      height: 40px;
      outline: 0;
      border: 1px solid ${Gray.gray5};
      border-radius: ${BorderRadius.$borderRadiusSmall};
      padding: 0 10px;
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      line-height: 1.4;
      color: ${Gray.gray3};
    }
  }

  &.Modal-SubmitBtn {
    padding: 5px 10px;
    display: inline-block;
    background: ${Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${FontSize.fontSizeBodyVerySmall};
    font-weight: ${Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${Color.white};
    &:hover {
      box-shadow: ${Shadows.boxShadowCard};
    }
    margin-top: 20px;
    width: 100%;
    cursor: pointer;
  }
`;

export const TokenForm = styled.form`
  &.GiveTokenForm {
    display: flex;
    flex-direction: column;
    label {
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 15px;
    }
    input {
      width: 100%;
      height: 40px;
      outline: 0;
      border: 1px solid ${Gray.gray5};
      border-radius: ${BorderRadius.$borderRadiusSmall};
      padding: 0 10px;
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      color: ${Primary.primary};
      line-height: 1.4;
      color: ${Gray.gray3};
    }

    input[type="submit"] {
      padding: 5px 10px;
      display: inline-block;
      background: ${Background.purpleBGLinear};
      border: none;
      outline: none;
      font-size: ${FontSize.fontSizeBodyVerySmall};
      font-weight: ${Weight.fontWeightRegular};
      line-height: 1.4;
      color: ${Color.white};
      &:hover {
        box-shadow: ${Shadows.boxShadowCard};
      }
      border-radius: ${BorderRadius.$borderRadiusSmall};
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;

export const SelectionModal = styled.section`
  .AddressList {
    ol {
      padding: 20px 25px;
      li {
        font-size: ${FontSize.fontSizeBodySmall};
        font-weight: ${Weight.fontWeightRegular};
        color: ${Primary.primary};
        line-height: 1.4;
        max-width: 100%;
        margin-bottom: 5px;
      }
    }
  }
  .WalletModal-input {
    width: 100%;
    height: 40px;
    outline: 0;
    border: 1px solid ${Gray.gray5};
    border-radius: ${BorderRadius.$borderRadiusSmall};
    padding: 0 10px;
    font-size: ${FontSize.fontSizeBodyLightSmall};
    font-weight: ${Weight.fontWeightLight};
    line-height: 1.4;
    color: ${Gray.gray3};

    &:focus {
      border: ${Color.blue} solid 2px;
    }
  }

  .WalletModal-Submit {
    width: 100px;
    height: 35px;
    padding: 5px 10px;
    display: inline-block;
    background: ${Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${FontSize.fontSizeBodyVerySmall};
    font-weight: ${Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${Color.white};
    &:hover {
      box-shadow: ${Shadows.boxShadowCard};
    }
    border-radius: ${BorderRadius.$borderRadiusSmall};
    margin-top: 20px;
    cursor: pointer;
  }
`;
