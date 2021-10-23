import React, { useContext, useState } from "react";
import { UserContext } from "../../context/store";

export default function SubscriptionModal(props) {
  const [formData, setFormData] = useState({});
  const { globalState, dispatch } = useContext(UserContext);
  const username = globalState.user.username;

  const { plan, handleSubmit, renew } = props;

  const characteristics = plan.characteristics;
  const characsInputs = characteristics.map((item) => (
    <div key={item} className="Modal-InputPart">
      <label>{item+":"}</label>
      <input
        type="text"
        onChange={(e) => {
          setFormData({ ...formData, [item]: e.target.value });
        }}
      />
    </div>
  ));
  // console.log(username);
  // console.log(renew);
  if (username && !formData.username) {
    // console.log("heey");
    setFormData({ ...formData, username: username });
  }
  return (
    <section className="SubscriptionModal">
      <h1>Complete the subscription form</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e, formData);
        }}
      >
        {!username && !renew && (
          <div className="Modal-InputPart">
            <label>username:</label>
            <input
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </div>
        )}

        {!renew && (
          <div className="Modal-InputPart">
            <label>password:</label>
            <input
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
        )}

        {characsInputs}

        <input className="Modal-SubmitBtn" type="submit" value="Subscribe" />
      </form>
    </section>
  );
}
