import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/store";

export default function Home() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  console.log("index");
  const userType = globalState.user.type;

  if (userType == "provider") {
    router.push("/provider/");
  } else if (userType == "user") {
    router.push("/user/");
  }

  return <div className="LoginPage"></div>;
}
