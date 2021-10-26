import React, { useContext, useState } from "react";
import { handleDataContext } from "../../context/handleData";

//The component for generating login form
export default function LoginPart(props) {
  const { type } = props;
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { handleSubscriberloginByUsername, handleProviderloginByUsername } =
    useContext(handleDataContext);
  const handleLogin = () => {
    if (type === "subscriber") {
      handleSubscriberloginByUsername(loginData.username, loginData.password);
    } else if (type === "provider") {
      handleProviderloginByUsername(loginData.username, loginData.password);
    }
  };

  return (
    <section className="Login">
      <h1>Log in by Username and Password</h1>
      <p>If you have interacted with the contract and have an account you can log in here.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
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
    </section>
  );
}
