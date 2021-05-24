import LoginPart from "../componenets/wallet/loginPart";
import WalletConnection from "../componenets/wallet/walletConnection";
import data from "../data/testData/sampleUser.json";

export default function Home() {
  const user = data.user;

  // const data = useSelector(state);
  // console.log(data);
  return (
    <div className="LoginPage">
      <WalletConnection />
      <LoginPart />
    </div>
  );
}
