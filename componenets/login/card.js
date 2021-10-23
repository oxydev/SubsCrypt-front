import React, { useState } from "react";

const Card = (props) => {
  const { clickHandler, selected, item, disabled, circle } = props;
  const styleCircle = {
    'border-radius': "48px"
  };
  const styleNormal = {
    'border-radius': "0px"
  };
  return (
    <div
      className={selected ? "ButtonCard selected" : disabled ? "ButtonCard disabled" : "ButtonCard"}
      onClick={clickHandler}
    >
      <div>
        <img src={item.imageURL} alt="" style={circle ? styleCircle : styleNormal} />
        <span className={selected ? "lamp selected" : "lamp"}></span>
      </div>
      <p>{item.name}</p>
    </div>
  );
};

export default Card;
