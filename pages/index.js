import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/store";
import { authContext } from "../pages/_app";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth } = useContext(authContext);

  useEffect(() => {
    if (userType == "provider") {
      router.push("/provider/");
    } else {
      router.push("/user/");
    }
  });
  return <div className="LoginPage"></div>;
}
