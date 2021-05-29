import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const userType = Cookies.get("subscryptType");

  useEffect(() => {
    console.log(userType);
    if (userType == "provider") {
      router.push("/provider/");
    } else {
      router.push("/user/");
    }
  });
  return <div className="LoginPage"></div>;
}
