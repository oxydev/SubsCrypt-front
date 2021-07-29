import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { dataContext } from "../../context/getData";

export default function UserLogin() {
  const { checkUserAuthWithUserName } = useContext(dataContext);

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={checkUserAuthWithUserName} />
    </div>
  );
}
