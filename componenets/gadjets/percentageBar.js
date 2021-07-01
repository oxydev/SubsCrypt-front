import React from "react";

export default function PercentageBar(props) {
  const percentage = props.percentage;
  return (
    <div className="PercentageBar">
      <div className="percentage" style={{ right: `${100 - percentage}%` }}></div>
    </div>
  );
}
