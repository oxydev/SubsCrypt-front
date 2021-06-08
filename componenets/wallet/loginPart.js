import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import { checkAuthWithUserName } from "../../dataFunctions/getData";
import { useRouter } from "next/router";

export default function LoginPart(props) {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth, setAuth } = useContext(authContext);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();
    checkAuthWithUserName(loginData.username, loginData.password, dispatch, setAuth);
  }

  return (
    <section className="Login">
      <h6>or</h6>
      <h1>Log in</h1>
      <p>If you have interacted with the contract and have an account you can log in here.</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setLoginData({ ...loginData, username: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        />
        <input type="submit" value="Log in" />
      </form>
    </section>
  );
}
