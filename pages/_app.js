import "../styles/app.scss";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import Login from "./login";
import { Store } from "../context/store";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const authContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("subscrypt")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      </Head>
      <authContext.Provider value={{ auth, setAuth }}>
        <Store>
          <div className="WholePageWrapper">
            <SideBar />
            <Main>
              <Header />
              {auth ? <Component {...pageProps} /> : <Login {...pageProps} />}
            </Main>
            <div></div>
          </div>
        </Store>
      </authContext.Provider>
    </>
  );
}
