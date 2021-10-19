import React, { useEffect, useState } from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorialList, setTutorialList] = useState(null);
  //lists is like : [{target: dom ref, tutorialElement: jsx}]
  const [order, setOrder] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.current.classList.remove("Dominent");
      }
      const target = tutorialList[order].target.current;
      console.log(checkPos(target));
      const tutPos = checkPos(target);
      setPosition({ top: tutPos.top, left: tutPos.left });
      target.classList.add("Dominent");
      console.log(position);
    }
    console.log(position);
  }, [order, tutorialList]);

  useEffect(() => {
    if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.current.classList.remove("Dominent");
      }
      const target = tutorialList[order].target.current;
      console.log(checkPos(target));
      const tutPos = checkPos(target);
      setPosition({ top: tutPos.top, left: tutPos.left });
      target.classList.add("Dominent");
    }
  }, []);

  const checkPos = (elm) => {
    const pos = elm.getBoundingClientRect();
    const tutPos = {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const top = pos.top;
    const left = pos.left;
    const right = vw - pos.right;
    const bottom = vh - pos.bottom;
    const height = pos.height;
    const width = pos.width;
    console.log(pos);
    console.log(top, right, bottom, left);
    let place = { vertical: "middle", horizontal: "right" };
    if (top > 160 && bottom > 160) {
      place.vertical = "middle";
      tutPos.top = top + height / 2 - 155;
    } else if (top < 160) {
      place.vertical = "bottom";
      tutPos.top = top + height + 100;
    } else {
      place.vertical = "top";
      tutPos.top = top - 409;
    }
    if (right > 400) {
      place.horizontal = "right";
      tutPos.left = left + width + 100;
    } else if (left > 400) {
      place.horizontal = "left";
      tutPos.left = left - 409;
    } else {
      place.horizontal = "middle";
      tutPos.left = left + width / 2 - 155;
    }

    return tutPos;
  };

  const endTutorial = () => {
    for (const elm of tutorialList) {
      elm.target.current.classList.remove("Dominent");
    }
    setTutorialList(null);
  };

  console.log(tutorialList);
  return (
    <tutorialContext.Provider value={{ setTutorialList }}>
      <>
        {props.children}
        {tutorialList && tutorialList.length > 0 && (
          <>
            <div
              className="TutorialBox"
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
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
                  endTutorial();
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
