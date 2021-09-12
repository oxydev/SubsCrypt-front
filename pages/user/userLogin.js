import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import {LoginPage} from '../../styles/pageStyle'

import { handleDataContext } from "../../context/handleData";
export default function UserLogin() {
  const { handleSubscriberloginByUsername } = useContext(handleDataContext);

  return (
    <LoginPage className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleSubscriberloginByUsername} />
    </LoginPage>
  );
}
