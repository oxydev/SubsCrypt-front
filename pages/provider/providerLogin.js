import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { handleDataContext } from "../../context/handleData";

export default function ProviderLogin() {
  const { handleProviderloginByUsername } = useContext(handleDataContext);

  return (
    <div className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={handleProviderloginByUsername} />
    </div>
  );
}
