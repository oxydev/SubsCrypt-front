import React from "react";

export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [tutorial, setTutorial] = useState(null);
  return (
    <tutorialContext.Provider value={{}}>
      <>
        {props.children}
        <div className="TutorialBox">{tutorial}</div>
        <div
          className={tutorial ? "TutorialFilter" : "TutorialFilter hidden"}
          onClick={(e) => {
            setTutorial(null);
          }}
        ></div>
      </>
    </tutorialContext.Provider>
  );
};
