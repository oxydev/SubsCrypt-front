import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ReactJoyride from "react-joyride";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [steps, setSteps] = useState(null);
  const [run, setRun] = useState(false);

  const handleTutorial = (tutLists) => {
    setSteps([...tutLists]);
  };

  const continueTutorial = (useless) => {
    console.log("continue");
  };

  useEffect(() => {
    setRun(true);
  }, [steps]);

  useEffect(() => {
    console.log(steps, run);
  }, [steps, run]);

  return (
    <tutorialContext.Provider value={{ handleTutorial, continueTutorial }}>
      <>
        {steps && <ReactJoyride steps={steps} continuous={true} run={run} />}
        {props.children}
      </>
    </tutorialContext.Provider>
  );
};

// const [tutorialList, setTutorialList] = useState(null);
//   //lists is like : [{target: dom ref, tutorialElement: jsx}]
//   const [order, setOrder] = useState(0);
//   const [position, setPosition] = useState({ top: -400, left: -400 });

//   function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
//   const continueTutorial = async (tutorialData, newOrder) => {
//     // console.log(tutorialData);
//     if (order === tutorialData.length - 1) return;
//     setOrder(newOrder);
//     let tutList = [];
//     await sleep(500);
//     for (const item of tutorialData) {
//       // console.log("fuck", document.getElementById(item.elementName), item);
//       while (document.getElementById(item.elementName) == null)
//         await sleep(200);
//       tutList.push({
//         target: document.getElementById(item.elementName),
//         tutorialElement: { title: item.title, description: item.description },
//       });
//     }
//     setTutorialList(tutList);
//   };

//   const handleTutorial = async (tutorialData) => {
//     let tutList = [];
//     setOrder(0);
//     await sleep(500);

//     for (const item of tutorialData) {
//       // console.log(item, document.getElementById(item.elementName));

//       while (document.getElementById(item.elementName) == null)
//         await sleep(200);

//       tutList.push({
//         target: document.getElementById(item.elementName),
//         tutorialElement: { title: item.title, description: item.description },
//       });
//     }
//     setTutorialList(tutList);
//   };

//   useEffect(async () => {
//     if (Cookies.get("tutorial") === "off") {
//       setTutorialList(null);
//     } else if (tutorialList && tutorialList.length > 0) {
//       for (const elm of tutorialList) {
//         elm.target.classList.remove("Dominent");
//       }
//       const target = tutorialList[order].target;
//       const tutPos = await checkPos(target);
//       setPosition({
//         top: tutPos.top,
//         left: tutPos.left,
//         vertical: tutPos.vertical,
//         horizontal: tutPos.horizontal,
//       });
//       target.classList.add("Dominent");
//       // console.log(position);
//     }
//   }, [order, tutorialList]);

//   const checkPos = async (elm) => {
//     elm.scrollIntoView({ block: "center" });
//     await sleep(100);

//     let pos = elm.getBoundingClientRect();
//     let vw = window.innerWidth;
//     let vh = window.innerHeight;
//     let top = pos.top;
//     let left = pos.left;
//     let right = vw - pos.right;
//     let bottom = vh - pos.bottom;
//     let height = pos.height;
//     let width = pos.width;

//     let place = { vertical: "middle", horizontal: "right" };
//     if (top > 160 && bottom > 160) {
//       place.vertical = "middle";
//       place.top = top + height / 2 - 155;
//     } else if (top < 160) {
//       place.vertical = "bottom";
//       place.top = top + height + 100;
//     } else {
//       place.vertical = "top";
//       place.top = top - 409;
//     }
//     if (right > 400) {
//       place.horizontal = "right";
//       place.left = left + width + 100;
//     } else if (left > 400) {
//       place.horizontal = "left";
//       place.left = left - 409;
//     } else {
//       place.horizontal = "middle";
//       place.left = left + width / 2 - 155;
//     }

//     if (place.horizontal == "middle" && place.vertical == "middle") {
//       place.vertical = "bottom";
//       place.top = top + height + 100;
//     }
//     return place;
//   };

//   const endTutorial = () => {
//     for (const elm of tutorialList) {
//       elm.target.classList.remove("Dominent");
//     }
//     setTutorialList(null);
//   };
