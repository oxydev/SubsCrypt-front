import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { handleDataContext } from "../../context/handleData";
export default function UserLogin() {
  const { handleSubscriberloginByUsername } = useContext(handleDataContext);

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleSubscriberloginByUsername} />
    </div>
  );
}
