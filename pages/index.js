import LoginPart from "../componenets/wallet/loginPart";
import WalletConnection from "../componenets/wallet/walletConnection";
import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";

export default function Home() {
  // const data = useSelector(state);
  // console.log(data);

  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div className="LoginPage">
      <WalletConnection />
      <LoginPart />
    </div>
  );
}
