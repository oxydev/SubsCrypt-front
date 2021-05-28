import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/store";
import { authContext } from "../pages/_app";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth } = useContext(authContext);
  const userName = Cookies.get("subscrypt");
  const password = Cookies.get("subscryptPass");
  const userType = Cookies.get("SubscryptType");

  useEffect(() => {
    if (auth && !globalState.user) {
      dispatch({
        type: "LOAD_USER",
        payload: { username: userName, password: password, type: userType },
      });
    }
    if (userType == "provider") {
      router.push("/provider/");
    } else {
      router.push("/user/");
    }
  });
  return <div className="LoginPage"></div>;
}
