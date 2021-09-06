import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { testDataContext } from "../../context/getDataTest";
export default function UserLogin() {
  const { handleSubscriberloginByUsername } = useContext(testDataContext);

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleSubscriberloginByUsername} />
    </div>
  );
}
