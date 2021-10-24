import React, { useEffect, useState } from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorialList, setTutorialList] = useState(null);
  //lists is like : [{target: dom ref, tutorialElement: jsx}]
  const [order, setOrder] = useState(0);
  const [position, setPosition] = useState({ top: -400, left: -400 });

  const handleTutorial = (tutorialData) => {
    let tutList = [];
    for (const item of tutorialData) {
      tutList.push({
        target: document.getElementById(item.elementName),
        tutorialElement: { title: item.title, description: item.description },
      });
    }

    setTutorialList(tutList);
  };

  useEffect(() => {
    if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.classList.remove("Dominent");
      }
      const target = tutorialList[order].target;
      console.log(checkPos(target));
      const tutPos = checkPos(target);
      setPosition({
        top: tutPos.top,
        left: tutPos.left,
        vertical: tutPos.vertical,
        horizontal: tutPos.horizontal,
      });
      target.classList.add("Dominent");
      console.log(position);
    }
    console.log(position);
  }, [order, tutorialList]);

  useEffect(() => {
    console.log(position);
  });

  const checkPos = (elm) => {
    const pos = elm.getBoundingClientRect();
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
      place.top = top + height / 2 - 155;
    } else if (top < 160) {
      place.vertical = "bottom";
      place.top = top + height + 100;
    } else {
      place.vertical = "top";
      place.top = top - 409;
    }
    if (right > 400) {
      place.horizontal = "right";
      place.left = left + width + 100;
    } else if (left > 400) {
      place.horizontal = "left";
      place.left = left - 409;
    } else {
      place.horizontal = "middle";
      place.left = left + width / 2 - 155;
    }

    return place;
  };

  const endTutorial = () => {
    for (const elm of tutorialList) {
      elm.target.classList.remove("Dominent");
    }
    setTutorialList(null);
  };

  console.log(tutorialList);
  return (
    <tutorialContext.Provider value={{ handleTutorial }}>
      <>
        {props.children}
        {tutorialList && tutorialList.length > 0 && (
          <>
            <div
              className={"TutorialBox " + position.vertical + position.horizontal}
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
              <img src="/logo/tutLogo.png" />
              <h2>{tutorialList[order].tutorialElement.title}</h2>
              <p>{tutorialList[order].tutorialElement.description}</p>
              <div className="BtnContainer">
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
            </div>
            <div className="TutorialFilter"></div>
          </>
        )}
      </>
    </tutorialContext.Provider>
  );
};
