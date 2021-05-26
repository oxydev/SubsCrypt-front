import "../styles/app.scss";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import { Store } from "../context/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      </Head>
      <Store>
        <div className="WholePageWrapper">
          <SideBar />
          <Main>
            <Header />
            <Component {...pageProps} />
          </Main>
          <div></div>
        </div>
      </Store>
    </>
  );
}
