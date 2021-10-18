import "../styles/app.scss";
import Head from "next/head";
import SideBar from "../componenets/layOut/sideBar";
import Header from "../componenets/layOut/header";
import Main from "../componenets/layOut/Main";
import Login from "./login";
import { Store } from "../context/store";
import { Modal } from "../context/modal";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../componenets/layOut/loading";
import { ServerFunctions } from "../context/getServerData";
import { HandleDataFunctions } from "../context/handleData";
import { GetBCDataFunctions } from "../context/getBCData";
import { SetDataFunctions } from "../context/setData";
import { Operation } from "../context/handleUserOperation";
import { Tutorial } from "../context/tutorial";

//Creating context for authentication and loading.
export const authContext = React.createContext();
export const loadingContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //Turn on and off the loading when the page url has been changed
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

  return (
    <>
      <Head>
        <link
          //import the rubik google font to the project
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Head>
      <loadingContext.Provider value={{ loading, setLoading }}>
        <authContext.Provider value={{ auth, setAuth }}>
          <Store>
            <Modal>
              <Operation>
                <Tutorial>
                  <ServerFunctions>
                    <GetBCDataFunctions>
                      <HandleDataFunctions>
                        <SetDataFunctions>
                          <div className="WholePageWrapper">
                            <SideBar />
                            {/* Main componenet is for the main part of the app where each page content is shown */}
                            {/* Auth context is for checking user authentication. If false header and othe pages are not shown */}
                            <Main>
                              {loading ? (
                                <Loading />
                              ) : (
                                <>
                                  {auth && <Header />}
                                  {auth ? <Component {...pageProps} /> : <Login {...pageProps} />}
                                </>
                              )}
                            </Main>
                            <div></div>
                          </div>
                        </SetDataFunctions>
                      </HandleDataFunctions>
                    </GetBCDataFunctions>
                  </ServerFunctions>
                </Tutorial>
              </Operation>
            </Modal>
          </Store>
        </authContext.Provider>
      </loadingContext.Provider>
    </>
  );
}
