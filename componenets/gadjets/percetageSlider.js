import React, { useState } from "react";
import Slider from "react-rangeslider";

export default function PercentSlider(props) {
  const { callBack, value, handleChange } = props;

  function handleChangeStart() {
    console.log("slider change start");
  }

  function handleChangeDo(value) {
    handleChange(value);
  }

  function handleChangeComplete() {
    console.log("Slider change has been completed");
    callBack("refund", value);
  }
  return (
    <div className="PercentSlider">
      <Slider
        min={0}
        max={100}
        value={value}
        onChangeStart={handleChangeStart}
        onChange={handleChangeDo}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
}
