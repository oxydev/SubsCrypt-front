import React, { useState } from "react";

const Card = (props) => {
  const { clickHandler, selected, item, disabled, circle, id } = props;
  const styleCircle = {
    borderRadius: "48px",
  };
  const styleNormal = {
    borderRadius: "0px",
  };
  return (
    <div
      id={id}
      className={
        selected
          ? "ButtonCard selected"
          : disabled
          ? "ButtonCard disabled"
          : "ButtonCard"
      }
      onClick={clickHandler}
    >
      <div>
        <img
          src={item.imageURL}
          alt=""
          style={circle ? styleCircle : styleNormal}
        />
        <span className={selected ? "lamp selected" : "lamp"}></span>
      </div>
      <p>{item.name}</p>
    </div>
  );
};

export default Card;
