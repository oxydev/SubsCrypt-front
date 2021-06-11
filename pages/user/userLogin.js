import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import { checkUserAuthWithUserName } from "../../dataFunctions/userGetData";
import { useRouter } from "next/router";

export default function UserLogin() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth, setAuth } = useContext(authContext);

  // useEffect(() => {
  //   console.log("login");
  //   router.replace("/login");
  // }, [])

  function handleUserLogin(userName, password) {
    checkUserAuthWithUserName(userName, password, dispatch, setAuth);
  }

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleUserLogin} />
    </div>
  );
}
