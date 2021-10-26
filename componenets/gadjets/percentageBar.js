import React from "react";

//The component for showing the precentage of plan usage
export default function PercentageBar(props) {
  const percentage = props.percentage;
  return (
    <div className="PercentageBar">
      <div
        className="percentage"
        style={{ right: `${100 - percentage}%` }}
      ></div>
    </div>
  );
}
