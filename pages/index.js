import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserContext } from "../context/store";

export default function Home() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const userType = globalState.user.type;

  if (userType == "provider") {
    router.push("/provider/");
  } else {
    router.push("/user/");
  }

  return <div className="LoginPage"></div>;
}
