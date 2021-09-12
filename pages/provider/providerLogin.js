import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { handleDataContext } from "../../context/handleData";
import {LoginPage} from '../../styles/pageStyle'

export default function ProviderLogin() {
  const { handleProviderloginByUsername } = useContext(handleDataContext);

  return (
    <LoginPage className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={handleProviderloginByUsername} />
    </LoginPage>
  );
}
