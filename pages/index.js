import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/store";

export default function Home() {
  const router = useRouter();
  const { globalState } = useContext(UserContext);
  const userType = globalState.user.type;

  //Navigate the user to the right path according to his type as a provider or ordinary user
  if (userType === "provider") {
    router.push("/provider/");
  } else if (userType === "user") {
    router.push("/user/");
  }

  return <div className="LoginPage"/>;
}
