import { useContext, useEffect, useRef, useState } from "react";
//import UserLogin from "./user/userLogin";
import { authContext } from "../_app";
import { handleDataContext } from "../../context/handleData";
import Cookies from "js-cookie";
import { tutorialContext } from "../../context/tutorial";
import Login from "./login";
import tutData from "../../data/tutorial.json";
import { UserContext } from "../../context/store";
import Link from "next//link";
import { useRouter } from "next/router";

//This is the login page which consists of a menu for selecting the user part and navigate to the related login menu according to the type
export default function Menu() {
  const router = useRouter();
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

  function hanadleGetToken() {
    sendMoneyToAddress();
  }

  useEffect(() => {
    //Check the cookies and authentication if cokkies are set
    if (!auth && (password || userWallet)) {
      checkAuthByCookie();
    } else {
      handleTutorial(tutorialData);
    }

    //change the status by clicking on sidebar links
    const mainLoginLink = document.getElementById("PublicDashboard");
    const userLoginLink = document.getElementById("PublicUser");
    //const providerLoginLink = document.getElementById("PublicProvider");
    const signUpLink = document.getElementById("publicSignUp");
    const giveTokenLink = document.getElementById("giveSomeToken");

    if (mainLoginLink) {
      mainLoginLink.onclick = () => {
        router.push("/login/");
      };

      userLoginLink.onclick = () => {
        router.push("/login/login");
      };

      signUpLink.onclick = () => {
        router.push("/login/signUp");
      };
    }
  }, [auth]);

  //change the login menu according to selecting each type
  // if (task === "none") {
  return (
    <section className="MainLoginPage">
      <h1>Main Menu</h1>
      <div>
        <Link href="./login/login">
          <a id="loginButton">Login</a>
        </Link>
        <Link href="./login/signUp">
          <a id="SignUpButton">Become Provider</a>
        </Link>
        <div className="Divider"></div>
        <button id="faucet" onClick={hanadleGetToken}>
          Faucet
        </button>
      </div>
    </section>
  );
  // } else if (task === "login") {
  //   return <Login />;
  // } else if (task === "providerSignUp") {
  //   return (
  //     <div className="SignUp-walletConnection">
  //       <Login action={"signUp"} />
  //     </div>
  //   );
  // }
}
