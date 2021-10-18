import { useContext, useEffect, useRef, useState } from "react";
import UserLogin from "./user/userLogin";
import ProviderLogin from "./provider/providerLogin";
import { authContext } from "./_app";
import { handleDataContext } from "../context/handleData";
import Cookies from "js-cookie";
import WalletConnection from "../componenets/login/walletConnection";
import { tutorialContext } from "../context/tutorial";

//This is the login page which consists of a menu for selecting the user part and navigate to the related login menu according to the type
export default function Login() {
  const [role, setRole] = useState("none");
  const { setTutorialList } = useContext(tutorialContext);
  const { checkAuthByCookie, sendMoneyToAddress } = useContext(handleDataContext);
  const { auth } = useContext(authContext);

  const tutorialRef1 = useRef(null);
  const tutorialRef2 = useRef(null);
  const tutorialRef3 = useRef(null);

  const tutorial1 = <h1>hello tutorial1</h1>;
  const tutorial2 = <h1>hello tutorial2</h1>;
  const tutorial3 = <h1>hello tutorial3</h1>;

  useEffect(() => {
    const list = [
      { target: tutorialRef1, tutorialElement: tutorial1 },
      { target: tutorialRef2, tutorialElement: tutorial2 },
      { target: tutorialRef3, tutorialElement: tutorial3 },
    ];
    setTutorialList(list);
  }, [tutorialRef1, tutorialRef2, tutorialRef3]);

  //get coockies
  const password = Cookies.get("subscryptPass");
  const userWallet = Cookies.get("subscryptAddress");

  function handleUserLogin() {
    setRole("user");
  }

  function handleProviderLogin() {
    setRole("provider");
  }

  function handleProviderSignUp() {
    setRole("providerSignUp");
  }

  function hanadleGetToken() {
    sendMoneyToAddress();
  }

  useEffect(() => {
    //Check the cookies and authentication if cokkies are set
    if (!auth && (password || userWallet)) {
      // window.alert("auth");
      checkAuthByCookie();
    }

    //change the status by clicking on sidebar links
    const mainLoginLink = document.getElementById("PublicDashboard");
    const userLoginLink = document.getElementById("PublicUser");
    //const providerLoginLink = document.getElementById("PublicProvider");
    const signUpLink = document.getElementById("publicSignUp");
    const giveTokenLink = document.getElementById("giveSomeToken");

    if (mainLoginLink) {
      mainLoginLink.onclick = () => {
        setRole("none");
      };

      userLoginLink.onclick = () => {
        setRole("user");
      };

      // providerLoginLink.onclick = () => {
      //   setRole("provider");
      // };

      signUpLink.onclick = () => {
        setRole("providerSignUp");
      };

      giveTokenLink.onclick = hanadleGetToken;
    }
  });

  //change the login menu according to selecting each type
  if (role == "none") {
    return (
      <section className="MainLoginPage">
        <h1>Main Menu</h1>
        <div>
          <button ref={tutorialRef1} onClick={handleUserLogin}>
            Login
          </button>
          <button ref={tutorialRef2} onClick={handleProviderSignUp}>
            Become Provider
          </button>
          <div className="Divider"></div>
          <button ref={tutorialRef3} onClick={hanadleGetToken}>
            Faucet
          </button>
        </div>
      </section>
    );
  } else if (role == "user") {
    return <UserLogin />;
  } else if (role == "provider") {
    return <ProviderLogin />;
  } else if (role == "providerSignUp") {
    return (
      <div className="SignUp-walletConnection">
        <WalletConnection type="provider" />
      </div>
    );
  }
}
