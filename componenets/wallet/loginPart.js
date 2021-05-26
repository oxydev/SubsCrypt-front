import React, { useContext, useState } from "react";
import { UserContext } from "../../context/store";
import dynamic from "next/dynamic";
// const subscrypt = dynamic(
//   () => {
//     return import("@oxydev/subscrypt");
//   },
//   { ssr: false }
// );

export default function LoginPart(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();
    const subscrypt = await import("@oxydev/subscrypt");
    const response = subscrypt.retrieveWholeDataWithUsername(
      loginData.username,
      loginData.password
    );
    console.log(response);
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
          type="text"
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
