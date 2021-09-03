import styled from "styled-components";
import {
  FontSize,
  Weight,
  Color,
  Gray,
  Primary,
  BorderRadius,
} from "./variables";

export const ProviderForm = styled.section`
  &.ProviderInfo,
  &.NewPlanCreation {
    // margin-bottom: 66px;
    & > h1 {
      font-size: ${FontSize.fontSizeBodyLarge};
      font-weight: ${Weight.fontWeightMedium};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 16px;
      position: relative;
      width: fit-content;
      cursor: pointer;

      span {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background-image: url("/icons/png/downArrow.png");
        background-position: center;
        right: -40px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }

    &.hidden {
      & > h1 > span {
        transform: scaleY(-1);
      }
      .PlanForm {
        max-height: 0;
        overflow: hidden;
        padding: 0;
      }
    }
  }

  .RemovePlanBtn {
    border: 1px solid ${Gray.gray4};
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    left: -40px;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: ${Color.white};
    &::after,
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      width: 10px;
      height: 2px;
      background-color: ${Gray.gray3};
      transform-origin: center;
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  &>.ProviderForm,
  .PlanForm {
    padding-top: 16px;
    border-top: 1px solid #e6e7eb;
    display: flex;
    label,
    input,
    select {
      display: block;
      width: 100%;
    }
    label {
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 6px;
    }
    input,
    select {
      border: 1px solid ${Gray.gray5};
      outline: none;
      border-radius: ${BorderRadius.$borderRadiusSmall};
      padding: 12px 16px;
      font-size: ${FontSize.fontSizeBodySmall};
      font-weight: ${Weight.fontWeightRegular};
      color: ${Primary.primary};
      line-height: 2.8rem;
      &::placeholder {
        color: ${Gray.gray4};
      }
      margin-bottom: 6px;
    }
    p {
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      line-height: 1.4;
      color: ${Gray.gray4};
      margin-bottom: 32px;
    }
  }
  .ProviderForm-info,
  .PlanForm-info {
    max-width: 462px;
    margin-right: 48px;
    flex-shrink: 0;
    flex-grow: 1;
  }
  .ProviderForm-photoUpload,
  .PlanForm-financial {
    max-width: 258px;
    flex-shrink: 0;
    flex-grow: 1;
    text-align: center;

    p {
      text-align: left;
    }
  }
  .PhotoUploadBtn {
    border: 1px dashed ${Gray.gray4};
    border-radius: 50%;
    width: 128px;
    height: 128px;
    display: inline-block;
    background-color: transparent;
    background-image: url("/icons/png/uploadBtn.png");
    background-position: center;
    background-size: auto;
    margin: 24px 0;
  }

  .PlanForm-financial {
    text-align: left;
    & > label {
      margin-bottom: 9px;
    }
  }
  .PlanForm-payCheckbox {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    input {
      width: fit-content;
      margin-right: 16px;
    }
    img {
      margin-right: 16px;
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }
  }
`;
