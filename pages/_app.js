import "../styles/app.scss";
import { Container } from "next/app";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Container>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
          />
        </Head>
        <div className="WholePageWrapper">
          <SideBar />
          <Main>
            <Header />
            <Component {...pageProps} />
          </Main>
          <div></div>
        </div>
      </Container>
    </Provider>
  );
}
