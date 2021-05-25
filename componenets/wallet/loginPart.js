import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoggedIn } from "../../redux/actions";
import data from "../../data/testData/sampleUser.json";

export default function LoginPart(props) {
  const user = data.user;

  return (
    <section className="Login">
      <h6>or</h6>
      <h1>Log in</h1>
      <p>If you have interacted with the contract and have an account you can log in here.</p>
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="submit" value="Log in" />
      </form>
    </section>
  );
}
