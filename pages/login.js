import LoginPart from "../componenets/wallet/loginPart";
import WalletConnection from "../componenets/wallet/walletConnection";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("login");
  //   router.replace("/login");
  // }, []);

  return (
    <div className="LoginPage">
      <WalletConnection />
      <LoginPart />
    </div>
  );
}
