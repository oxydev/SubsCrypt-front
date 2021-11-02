import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
export const tutorialContext = React.createContext();

export const Tutorial = (props) => {
  const [steps, setSteps] = useState(null);
  const [state, setState] = useState({ run: false, index: 0 });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleTutorial = async (tutorialData) => {
    if (Cookies.get("tutorial") === "on") {
      const stepsList = tutorialData.map((item) => ({
        target: "#" + item.elementName,
        title: item.title,
        content: item.description,
        placementBeacon: "right",
        placement: "right",
      }));
      await sleep(1000);
      setSteps([...stepsList]);
    }
  };

  const continueTutorial = async (newTutData, newIndex) => {
    await sleep(500);
    if (!state.run) {
      setState({ ...state, run: true });
    }
  };

  useEffect(() => {
    // console.log(steps);
    // console.log(state);
    setState({ run: true, index: 0 });
  }, [steps]);

  const toggleTutorial = (condition) => {
    if (condition == "start") {
      setState({ ...state, run: true });
    } else if (condition == "end") {
      setState({ ...state, run: false });
    }
  };

  const tooltip = ({
    continuous,
    index,
    step,
    backProps,
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

    // console.log(action, index, status, type);
    if (EVENTS.STEP_AFTER == type) {
      setState({ ...state, index: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setState({ ...state, run: false });
    } else if (EVENTS.TARGET_NOT_FOUND == type) {
      setState({ index: index, run: false });
    }
  };

  return (
    <tutorialContext.Provider
      value={{ handleTutorial, continueTutorial, toggleTutorial }}
    >
      <>
        {steps && (
          <ReactJoyride
            callback={handleJoyrideCallback}
            steps={steps}
            continuous={true}
            run={state.run}
            tooltipComponent={tooltip}
            stepIndex={state.index}
            disableScrolling={false}
            disableScrollParentFix={true}
            styles={{
              options: {
                arrowColor: "#5867ff",
                primaryColor: "#d71eae",
                zIndex: 1000,
                spotlightShadow: "0 0 15px rgba(0, 1, 0, 0.5)",
                overlayColor: "rgba(1,1,1,0.3)",
              },
            }}
          />
        )}
        {props.children}
      </>
    </tutorialContext.Provider>
  );
};
