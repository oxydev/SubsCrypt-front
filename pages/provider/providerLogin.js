import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import { checkProviderAuthWithUserName } from "../../dataFunctions/userGetData";
import { useRouter } from "next/router";

export default function ProviderLogin() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth, setAuth } = useContext(authContext);

  // useEffect(() => {
  //   console.log("login");
  //   router.replace("/login");
  // }, []);

  function handleProviderLogin(userName, password) {
    checkProviderAuthWithUserName(userName, password, dispatch, setAuth);
  }

  return (
    <div className="LoginPage">
      <WalletConnection />
      <LoginPart handler={handleProviderLogin} />
    </div>
  );
}
