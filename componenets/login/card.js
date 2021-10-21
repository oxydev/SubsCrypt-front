import React, { useState } from "react";

const Card = (props) => {
  const { clickHandler, selected, item, disabled } = props;

  return (
    <div
      className={selected ? "ButtonCard selected" : disabled ? "ButtonCard disabled" : "ButtonCard"}
      onClick={clickHandler}
    >
      <div>
        <img src={item.imageURL} alt="" />
        <span className={selected ? "lamp selected" : "lamp"}></span>
      </div>
      <p>{item.name}</p>
    </div>
  );
};

export default Card;
