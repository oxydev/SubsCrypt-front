import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorialList, setTutorialList] = useState(null);
  //lists is like : [{target: dom ref, tutorialElement: jsx}]
  const [order, setOrder] = useState(0);
  const [position, setPosition] = useState({ top: -400, left: -400 });
  const [lineDim, setLineDime] = useState(100);

  let boxDim = 310;
  let line = 100;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const continueTutorial = async (tutorialData, newOrder) => {
    // console.log(tutorialData);
    if (order === tutorialData.length - 1) return;
    setOrder(newOrder);
    let tutList = [];
    await sleep(500);
    for (const item of tutorialData) {
      // console.log("fuck", document.getElementById(item.elementName), item);
      while (document.getElementById(item.elementName) == null)
        await sleep(200);
      tutList.push({
        target: document.getElementById(item.elementName),
        tutorialElement: { title: item.title, description: item.description },
      });
    }
    setTutorialList(tutList);
  };

  const handleTutorial = async (tutorialData) => {
    let tutList = [];
    setOrder(0);
    await sleep(500);

    for (const item of tutorialData) {
      // console.log(item, document.getElementById(item.elementName));

      while (document.getElementById(item.elementName) == null)
        await sleep(200);

      tutList.push({
        target: document.getElementById(item.elementName),
        tutorialElement: { title: item.title, description: item.description },
      });
    }
    setTutorialList(tutList);
  };

  useEffect(async () => {
    if (Cookies.get("tutorial") === "off") {
      setTutorialList(null);
    } else if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.classList.remove("Dominent");
      }
      const target = tutorialList[order].target;
      const tutPos = await checkPos(target);
      setPosition({
        top: tutPos.top,
        left: tutPos.left,
        vertical: tutPos.vertical,
        horizontal: tutPos.horizontal,
        direction: tutPos.dir,
      });
      target.classList.add("Dominent");
    }
  }, [order, tutorialList]);

  useEffect(() => {
    console.log(position);
  }, [position]);

  useEffect(() => {
    console.log(lineDim);
  }, [lineDim]);

  const checkPos = async (elm) => {
    elm.scrollIntoView({ block: "center" });
    await sleep(100);

    let pos = elm.getBoundingClientRect();
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let top = pos.top;
    let left = pos.left;
    let right = vw - pos.right;
    let bottom = vh - pos.bottom;
    let height = pos.height;
    let width = pos.width;

    let place = { vertical: "middle", horizontal: "right" };
    if (top > boxDim / 2 + 5 && bottom > boxDim / 2 + 5) {
      console.log("1");
      place.vertical = "middle";
      place.dir = "horizontal";
      place.top = top + height / 2 - boxDim / 2;
      setLineDime(line - 2);
    } else if (top > line + boxDim) {
      console.log("2");
      place.vertical = "top";
      place.dir = "vertical";
      place.top = top - (line + boxDim);
      setLineDime(line - 2);
    } else if (bottom > line + boxDim) {
      console.log("3");
      place.vertical = "bottom";
      place.dir = "vertical";
      place.top = top + height + line;
      setLineDime(line - 2);
    } else {
      console.log("4");
      place.vertical = "bottom";
      place.dir = "s";
      place.top = top + height + line;
      setLineDime(line - 2);
    }
    if (right > boxDim + line) {
      place.horizontal = "right";
      place.dir = "horizontal";
      place.left = left + width + line;
      setLineDime(line - 2);
    } else if (left > boxDim + line) {
      place.horizontal = "left";
      place.dir = "horizontal";
      place.left = left - (line + boxDim);
      setLineDime(line - 2);
    } else {
      place.horizontal = "middle";
      place.dir = "vertical";
      place.left = left + width / 2 - boxDim / 2;
      setLineDime(line - 2);
    }

    if (place.horizontal == "middle" && place.vertical == "middle") {
      if (top > bottom) {
        console.log("4");
        place.vertical = "top";
        place.top = top - (line + boxDim);

        if (top < boxDim + line) {
          console.log("4");
          place.top = top - (top - boxDim);
        }

        setLineDime(top - (place.top + boxDim) - 2);
      } else {
        console.log("4");
        place.vertical = "bottom";
        place.top = top + height + line;

        if (bottom < boxDim + line) {
          console.log("4");
          place.top = top + height + bottom - boxDim;
        }

        setLineDime(place.top - (top + height) - 2);
      }
      place.dir = "vertical";
    }

    console.log(top, right, bottom, left, width, height, vw, vh);
    return place;
  };

  const endTutorial = () => {
    for (const elm of tutorialList) {
      elm.target.classList.remove("Dominent");
    }
    setTutorialList(null);
  };

  return (
    <tutorialContext.Provider value={{ handleTutorial, continueTutorial }}>
      <>
        {props.children}
        {tutorialList && tutorialList.length > 0 && (
          <>
            <div
              className={
                "TutorialBox " + position.vertical + position.horizontal
              }
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
              <img src="/logo/tutLogo.png" />
              <h2>{tutorialList[order].tutorialElement.title}</h2>
              <p>{tutorialList[order].tutorialElement.description}</p>
              <div className="BtnContainer">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (order > 0) {
                      setOrder(order - 1);
                    } else {
                      for (const elm of tutorialList) {
                        elm.target.classList.remove("Dominent");
                      }
                      setTutorialList(null);
                    }
                  }}
                >
                  Previous
                </button>
                <button
                  className="TutorialNextBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (order < tutorialList.length - 1) {
                      setOrder(order + 1);
                    } else {
                      for (const elm of tutorialList) {
                        elm.target.classList.remove("Dominent");
                      }
                      setTutorialList(null);
                    }
                  }}
                >
                  Next
                </button>
              </div>
              <button
                className="TutorialSkipBtn"
                onClick={(e) => {
                  e.preventDefault();
                  endTutorial();
                }}
              >
                Skip
              </button>
              <div
                className="Line"
                style={
                  position.direction == "vertical"
                    ? {
                        height: `${lineDim}px`,
                        width: "2px",
                        top: `${
                          position.vertical == "top" ? boxDim : -lineDim
                        }px`,
                        left: `${boxDim / 2}px`,
                      }
                    : {
                        width: `${lineDim}px`,
                        height: "2px",
                        top: `${boxDim / 2}px`,
                        left: `${
                          position.horizontal == "right" ? -lineDim : boxDim
                        }px`,
                      }
                }
              />
            </div>
            <div className="TutorialFilter"></div>
          </>
        )}
      </>
    </tutorialContext.Provider>
  );
};
