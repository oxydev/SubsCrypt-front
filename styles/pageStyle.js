import styled from "styled-components";

export const Providerstyled = styled.section`
  &.ProviderSignUp {
    padding-top: 73px;
    & > h1 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeHeading2};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 51px;
      margin-top: 60px;
    }
  }
  .PlansForm-addBtn {
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    color: ${({ theme }) => theme.Primary.primary};
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
    border-top: 1px solid ${({ theme }) => theme.Gray.gray5};
    padding-top: 32px;
    margin-bottom: 446px;
    display: flex;
    align-items: center;
    p {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLightSmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      line-height: 1.4rem;
      color: ${({ theme }) => theme.Gray.gray4};
      margin-right: 48px;
    }
    .RegisterBtn {
      width: 260px;
      height: 40px;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 40 / 2;
      background: ${({ theme }) => theme.Background.purpleBGLinear};
      border: none;
      outline: none;
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      line-height: 1.4rem;
      color: ${({ theme }) => theme.Color.white};
      &:hover {
        box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
      }
      border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyStandard};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      cursor: pointer;
    }
  }
`;

export const Setting = styled.section`
  &.ProfileSetting {
    padding-top: 73px;
    h1 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeHeading2};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 60px;
    }
  }
  .ResetPassword {
    h2 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodyLarge};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 30px;
    }
    form {
      input[type="password"] {
        width: 100%;
        height: 48px;
        line-height: 4.8rem;
        border: 1px solid #c4c7cc;
        border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
        margin-bottom: 23px;
        padding: 0 26px;
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
        font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
        color: ${({ theme }) => theme.Primary.primary};
        &::placeholder {
          color: ${({ theme }) => theme.Gray.gray5};
        }
      }
      input[type="submit"] {
        width: 100%;
        height: 48px;
        line-height: 4.8rem;
        border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
        margin-bottom: 23px;
        padding: 0 26px;
        font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
        color: ${({ theme }) => theme.Primary.primary};
        &::placeholder {
          color: ${({ theme }) => theme.Gray.gray5};
        }
        background-color: ${({ theme }) => theme.Color.green};
        color: ${({ theme }) => theme.Color.white};
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
      font-size: ${({ theme }) => theme.FontSize.fontSizeHeading2};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.5rem;
      margin-bottom: 35px;
    }
  }
`;

export const UDashboard = styled.div`
  &.userDashboard {
    padding-top: 73px;
    & > h1 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeHeading2};
      font-weight: ${({ theme }) => theme.Weight.fontWeightBold};
      color: ${({ theme }) => theme.Primary.primary};
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
