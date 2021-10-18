import React, { useEffect, useState } from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorialList, setTutorialList] = useState(null);
  //lists is like : [{target: dom ref, tutorialElement: jsx}]
  const [order, setOrder] = useState(0);
  const [position, setPosition] = useState(0, 0);

  useEffect(() => {
    if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.current.classList.remove("Dominent");
      }
      const target = tutorialList[order].target.current;
      console.log(checkPos(target));
      target.classList.add("Dominent");
    }
  });

  const checkPos = (elm) => {
    const pos = elm.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const top = pos.top;
    const left = pos.left;
    const right = vw - pos.right;
    const bottom = vh - pos.bottom;
    console.log(pos);
    console.log(top, right, bottom, left);
    let place = { vertical: "middle", horizontal: "right" };
    if (top > 160 && bottom < 160) {
      place.vertical = "middle";
    } else if (top < 160) {
      place.vertical = "bottom";
    } else {
      place.vertical = "top";
    }
    if (right > 400) {
      place.horizontal = "right";
    } else if (left > 400) {
      place.horizontal = "left";
    } else {
      place.horizontal = "middle";
    }
    return place;
  };

  console.log(tutorialList);
  return (
    <tutorialContext.Provider value={{ setTutorialList }}>
      <>
        {props.children}
        {tutorialList && tutorialList.length > 0 && (
          <>
            <div className="TutorialBox">
              {tutorialList[order].tutorialElement}
              <button
                className="TutorialNextBtn"
                onClick={(e) => {
                  e.preventDefault();
                  if (order < tutorialList.length - 1) {
                    setOrder(order + 1);
                  } else {
                    setTutorialList(null);
                  }
                }}
              >
                Next
              </button>
              <button
                className="TutorialSkipBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setTutorialList(null);
                }}
              >
                Skip Tutorial
              </button>
            </div>
            <div className="TutorialFilter"></div>
          </>
        )}
      </>
    </tutorialContext.Provider>
  );
};
