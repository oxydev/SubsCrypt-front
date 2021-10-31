import { useContext, useEffect, useRef, useState } from "react";
//import UserLogin from "./user/userLogin";
import { authContext } from "./_app";
import { handleDataContext } from "../context/handleData";
import Cookies from "js-cookie";
import { tutorialContext } from "../context/tutorial";
import Login from "./login";
import tutData from "../data/tutorial.json";
import { UserContext } from "../context/store";

//This is the login page which consists of a menu for selecting the user part and navigate to the related login menu according to the type
export default function Menu() {
  const [task, setTask] = useState("none");
  const { handleTutorial } = useContext(tutorialContext);
  const { checkAuthByCookie, sendMoneyToAddress } =
    useContext(handleDataContext);
  const { auth } = useContext(authContext);
  const tutorialData = tutData.tutorials.mainMenu;
  const { globalState } = useContext(UserContext);

  //get cookies
  const password = Cookies.get("subscryptPass");
  const userWallet = Cookies.get("subscryptAddress");

  function handleUserLogin() {
    setTask("login");
  }

  function handleProviderSignUp() {
    setTask("providerSignUp");
  }

  function hanadleGetToken() {
    sendMoneyToAddress();
  }

  const steps = tutorialData.map((item) => ({
    target: "#" + item.elementName,
    title: item.title,
    content: item.description,
    placementBeacon: "right",
    placement: "right",
  }));

  useEffect(() => {
    //Check the cookies and authentication if cokkies are set
    if (!auth && (password || userWallet)) {
      checkAuthByCookie();
    } else {
      handleTutorial(steps);
    }

    //change the status by clicking on sidebar links
    const mainLoginLink = document.getElementById("PublicDashboard");
    const userLoginLink = document.getElementById("PublicUser");
    //const providerLoginLink = document.getElementById("PublicProvider");
    const signUpLink = document.getElementById("publicSignUp");
    const giveTokenLink = document.getElementById("giveSomeToken");

    if (mainLoginLink) {
      mainLoginLink.onclick = () => {
        setTask("none");
      };

      userLoginLink.onclick = () => {
        setTask("login");
      };

      // providerLoginLink.onclick = () => {
      //   setTask("provider");
      // };

      signUpLink.onclick = () => {
        setTask("providerSignUp");
      };

      const sideBarStyleHandler = (elm) => {
        mainLoginLink.closest("li").classList.remove("select");
        userLoginLink.closest("li").classList.remove("select");
        signUpLink.closest("li").classList.remove("select");
        giveTokenLink.closest("li").classList.remove("select");
        elm.closest("li").classList.add("select");
      };

      if (task === "none") {
        sideBarStyleHandler(mainLoginLink);
      } else if (task === "login") {
        sideBarStyleHandler(userLoginLink);
      } else if (task === "providerSignUp") {
        sideBarStyleHandler(signUpLink);
      }
    }
  }, [auth]);

  //change the login menu according to selecting each type
  if (task === "none") {
    return (
      <section className="MainLoginPage">
        <h1>Main Menu</h1>
        <div>
          <button id="loginButton" onClick={handleUserLogin}>
            Login
          </button>
          <button id="SignUpButton" onClick={handleProviderSignUp}>
            Become Provider
          </button>
          <div className="Divider"></div>
          <button id="faucet" onClick={hanadleGetToken}>
            Faucet
          </button>
        </div>
      </section>
    );
  } else if (task === "login") {
    return <Login />;
  } else if (task === "providerSignUp") {
    return (
      <div className="SignUp-walletConnection">
        <Login action={"signUp"} />
      </div>
    );
  }
}
