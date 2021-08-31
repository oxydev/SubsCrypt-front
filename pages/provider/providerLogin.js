import { useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import WalletConnection from "../../componenets/login/walletConnection";
import { dataContext } from "../../context/getData";
import {LoginPage} from '../../styles/pageStyle'

export default function ProviderLogin() {
  const { checkProviderAuthWithUserName } = useContext(dataContext);

  return (
    <LoginPage className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={checkProviderAuthWithUserName} />
    </LoginPage>
  );
}
