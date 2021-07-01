import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/store";
import { authContext } from "./_app";

export default function Home() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const { auth } = useContext(authContext);

  const userType = globalState.user.type;

  if (userType == "provider") {
    router.push("/provider/");
  } else if (userType == "user") {
    router.push("/user/");
  }

  // if (!auth) {
  //   router.push("./login");
  // } else if (userType == "user") {
  //   router.push("./user/");
  // } else if (userType == "provider") {
  //   router.push("./provider");
  // }

  return <div className="LoginPage"></div>;
}
