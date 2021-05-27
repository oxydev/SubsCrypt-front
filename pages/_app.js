import "../styles/app.scss";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import Home from "./index";
import { Store } from "../context/store";
import { useState } from "react";
import React from "react";

export const authContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);

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
              {auth ? <Component {...pageProps} /> : <Home />}
            </Main>
            <div></div>
          </div>
        </Store>
      </authContext.Provider>
    </>
  );
}
