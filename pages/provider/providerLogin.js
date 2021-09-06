import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { testDataContext } from "../../context/getDataTest";

export default function ProviderLogin() {
  const { handleProviderloginByUsername } = useContext(testDataContext);

  return (
    <div className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={handleProviderloginByUsername} />
    </div>
  );
}
