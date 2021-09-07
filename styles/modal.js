import styled from "styled-components";

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
    border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
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
        background-color: ${({ theme }) => theme.Gray.gray3};
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
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightMedium};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 30px;
    }

    form {
      width: 100%;
    }
  }

  .Modal-InputPart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 30vw;
    margin: 20px 0;

    label {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      height: 40px;
      outline: 0;
      border: 1px solid ${({ theme }) => theme.Gray.gray5};
      border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
      padding: 0 10px;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray3};
    }
  }

  .Modal-SubmitBtn {
    height: 35px;
    padding: 5px 10px;
    display: inline-block;
    border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
    background: ${({ theme }) => theme.Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${({ theme }) => theme.Color.white};
    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
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
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 15px;
    }
    input {
      width: 100%;
      height: 40px;
      outline: 0;
      border: 1px solid ${({ theme }) => theme.Gray.gray5};
      border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
      padding: 0 10px;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      color: ${({ theme }) => theme.Gray.gray3};
    }

    input[type="submit"] {
      padding: 5px 10px;
      display: inline-block;
      background: ${({ theme }) => theme.Background.purpleBGLinear};
      border: none;
      outline: none;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      line-height: 1.4;
      color: ${({ theme }) => theme.Color.white};
      &:hover {
        box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
      }
      border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
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
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
        font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
        color: ${({ theme }) => theme.Primary.primary};
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
    border: 1px solid ${({ theme }) => theme.Gray.gray5};
    border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
    padding: 0 10px;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    line-height: 1.4;
    color: ${({ theme }) => theme.Gray.gray3};

    &:focus {
      border: ${({ theme }) => theme.Color.blue} solid 2px;
    }
  }

  .WalletModal-Submit {
    width: 100px;
    height: 35px;
    padding: 5px 10px;
    display: inline-block;
    background: ${({ theme }) => theme.Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${({ theme }) => theme.Color.white};
    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
    }
    border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
    margin-top: 20px;
    cursor: pointer;
  }
`;
