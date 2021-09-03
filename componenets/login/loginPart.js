import React, { useContext, useState } from "react";
import { UserContext } from "../../context/store";
import {LogIn} from "../../styles/wallet"

//The component for generating login form
export default function LoginPart(props) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const handleLogin = props.handler;

  return (
    <LogIn className="Login">
      <h6>or</h6>
      <h1>Log in</h1>
      <p>If you have interacted with the contract and have an account you can log in here.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(loginData.username, loginData.password);
        }}
      >
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
    </LogIn>
  );
}
