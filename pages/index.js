import LoginPart from "../componenets/wallet/loginPart";
import WalletConnection from "../componenets/wallet/walletConnection";

export default function Home() {
  return (
    <div className="LoginPage">
      <WalletConnection />
      <LoginPart />
    </div>
  );
}
