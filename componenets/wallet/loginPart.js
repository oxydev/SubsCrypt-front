import React from "react";

export default function LoginPart(props) {
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
