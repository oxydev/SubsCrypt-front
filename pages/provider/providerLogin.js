import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { dataContext } from "../../context/getData";

export default function ProviderLogin() {
  const { checkProviderAuthWithUserName } = useContext(dataContext);

  function handleProviderLogin(userName, password) {
    checkProviderAuthWithUserName(userName, password);
  }

  return (
    <div className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={handleProviderLogin} />
    </div>
  );
}
