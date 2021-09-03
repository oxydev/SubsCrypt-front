import React from "react";
import styled from "styled-components";
import {
  Background,
  FontSize,
  Weight,
  Color,
} from "../../styles/variables";

const Percentage = styled.div`
  .PercentageBar {
    width: 100%;
    height: 100%;
    border: 1px solid ${Color.purple};
    border-radius: 5px;
    position: relative;
  }
  .percentage {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: ${Background.purpleBGLinear};
  }
  .PercentNum {
    font-size: ${FontSize.fontSizeFootNote};
    font-weight: ${Weight.fontWeightLight};
    width: 100%;
    text-align: center;
    position: absolute;
    color: ${Color.white};
    z-index: 5;
    line-height: 11px;
  }
`;

//The component for showing the precentage of plan usage
export default function PercentageBar(props) {
  const percentage = props.percentage;
  return (
    <Percentage className="PercentageBar">
      <div
        className="percentage"
        style={{ right: `${100 - percentage}%` }}
      ></div>
    </Percentage>
  );
}
