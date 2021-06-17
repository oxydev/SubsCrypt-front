import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { dataContext } from "../../context/getData";

export default function UserLogin() {
  const { checkUserAuthWithUserName } = useContext(dataContext);

  function handleUserLogin(userName, password) {
    checkUserAuthWithUserName(userName, password);
  }

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleUserLogin} />
    </div>
  );
}
