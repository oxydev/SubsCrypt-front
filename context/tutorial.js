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
    // console.log("continue");
  };

  useEffect(() => {
    setRun(true);
  }, [steps]);

  useEffect(() => {
    // console.log(steps, run);
  }, [steps, run]);

  const tooltip = ({
    continuous,
    index,
    step,
    backProps,
    closeProps,
    primaryProps,
    tooltipProps,
  }) => (
    <div className="TutorialBox" {...tooltipProps}>
      <img src="/logo/tutLogo.png" />
      <h2>{step.title}</h2>
      <p>{step.content}</p>
      <div className="BtnContainer">
        {index > 0 && <button {...backProps}>Previous</button>}
        {continuous && <button {...primaryProps}>Next</button>}
        {!continuous && <button {...closeProps}>close</button>}
      </div>
    </div>
  );

  return (
    <tutorialContext.Provider value={{ handleTutorial, continueTutorial }}>
      <>
        {steps && (
          <ReactJoyride
            steps={steps}
            continuous={true}
            run={run}
            tooltipComponent={tooltip}
          />
        )}
        {props.children}
      </>
    </tutorialContext.Provider>
  );
};
