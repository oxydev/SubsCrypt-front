import "../styles/app.scss";
import { Container } from "next/App";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="WholePageWrapper">
        <SideBar />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </Container>
  );
}
