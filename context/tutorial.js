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
    if (Cookies.get("tutorial") === undefined || Cookies.get("tutorial") === "on") {
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

  // useEffect(() => {
  //   const index = state.index;
  //   if (state.run == true) {
  //     for (const item of steps) {
  //       const id = item.target.substring(1);
  //       document.getElementById(id).classList.remove("Dominent");
  //     }
  //     const id = steps[index].target.substring(1);
  //     console.log(id);
  //     document.getElementById(id).classList.add("Dominent");
  //   }
  // }, [state.index, state.run]);

  const toggleTutorial = (condition) => {
    setState({ ...state, run: condition });
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
      <embed src="/logo/logo2.svg" />
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
    console.log(action, index, status, type);
    if (state.run == true && steps) {
      for (const item of steps) {
        const id = item.target.substring(1);
        if (document.getElementById(id)) {
          document.getElementById(id).classList.remove("Dominent");
        }
      }
      if (steps[index]) {
        const id = steps[index].target.substring(1);
        if (document.getElementById(id)) {
          document.getElementById(id).classList.add("Dominent");
        }
      }
    }
    if (EVENTS.STEP_AFTER == type) {
      setState({ ...state, index: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setState({ ...state, run: false });
    } else if (EVENTS.TARGET_NOT_FOUND == type) {
      setState({ index: index, run: false });
    }

    if (
      [
        EVENTS.TARGET_NOT_FOUND,
        STATUS.FINISHED,
        STATUS.SKIPPED,
        EVENTS.BEACON,
        EVENTS.TOUR_END,
      ].includes(type)
    ) {
      console.log("finished");
      for (const item of steps) {
        const id = item.target.substring(1);
        if (document.getElementById(id)) {
          document.getElementById(id).classList.remove("Dominent");
        }
      }
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
                overlayColor: "rgba(255, 255, 255, 0.329)",
              },
            }}
          />
        )}
        {props.children}
      </>
    </tutorialContext.Provider>
  );
};
