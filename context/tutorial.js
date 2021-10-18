import React, { useEffect, useState } from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorialList, setTutorialList] = useState(null);
  //lists is like : [{target: dom ref, tutorialElement: jsx}]
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (tutorialList && tutorialList.length > 0) {
      for (const elm of tutorialList) {
        elm.target.current.classList.remove("Dominent");
      }
      const target = tutorialList[order].target.current;
      target.classList.add("Dominent");
    }
  });

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
            <div
              className="TutorialFilter"
              onClick={(e) => {
                setTutorialList(null);
              }}
            ></div>
          </>
        )}
      </>
    </tutorialContext.Provider>
  );
};
