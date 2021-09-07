import React from "react";
import styled from "styled-components";

const Percentage = styled.div`
  &.PercentageBar {
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.Color.purple};
    border-radius: 5px;
    position: relative;
  }
  .percentage {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: ${({ theme }) => theme.Background.purpleBGLinear};
  }
  .PercentNum {
    font-size: ${({ theme }) => theme.FontSize.fontSizeFootNote};
    font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
    width: 100%;
    text-align: center;
    position: absolute;
    color: ${({ theme }) => theme.Color.white};
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
