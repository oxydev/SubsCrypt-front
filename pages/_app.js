import "../styles/app.scss";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import Login from "./login";
import { Store } from "../context/store";
import { Modal } from "../context/modal";
import { DataFunctions } from "../context/getData";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../componenets/layOut/loading";

export const authContext = React.createContext();
export const loadingContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", (url) => {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    });
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      </Head>
      <loadingContext.Provider value={{ loading, setLoading }}>
        <authContext.Provider value={{ auth, setAuth }}>
          <Store>
            <Modal>
              <DataFunctions>
                <div className="WholePageWrapper">
                  <SideBar />
                  <Main>
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        {auth && <Header />}
                        {/* {auth ? <Component {...pageProps} /> : <Login {...pageProps} />} */}
                        <Component {...pageProps} />
                      </>
                    )}
                  </Main>
                  <div></div>
                </div>
              </DataFunctions>
            </Modal>
          </Store>
        </authContext.Provider>
      </loadingContext.Provider>
    </>
  );
}
