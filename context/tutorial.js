import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [steps, setSteps] = useState(null);
  const [state, setState] = useState({ run: false, index: 0 });

  const handleTutorial = (tutorialData) => {
    const stepsList = tutorialData.map((item) => ({
      target: "#" + item.elementName,
      title: item.title,
      content: item.description,
      placementBeacon: "right",
      placement: "right",
    }));

    setSteps([...stepsList]);
  };

  const continueTutorial = (useless) => {
    // console.log("continue");
  };

  useEffect(() => {
    setState({ run: true, index: 0 });
  }, [steps]);

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
        {continuous && (
          <button {...primaryProps}>
            {index == steps.length - 1 ? "Last" : "Next"}
          </button>
        )}
      </div>
    </div>
  );

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setState({ index: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false });
    }
  };

  return (
    <tutorialContext.Provider value={{ handleTutorial, continueTutorial }}>
      <>
        {steps && (
          <ReactJoyride
            callback={handleJoyrideCallback}
            steps={steps}
            continuous={true}
            run={state.run}
            tooltipComponent={tooltip}
            index={state.index}
          />
        )}
        {props.children}
      </>
    </tutorialContext.Provider>
  );
};
