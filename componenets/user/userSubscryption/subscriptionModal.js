import React, { useState } from "react";

export default function SubscriptionModal(props) {
  const [formData, setFormData] = useState({});

  const { plan, handleSubmit } = props;
  const characteristics = plan.characteristics;
  const characsInputs = characteristics.map((item) => (
    <div className="Modal-InputPart">
      <label>{item}</label>
      <input
        type="text"
        onChange={(e) => {
          setFormData({ ...formData, [item]: e.target.value });
        }}
      />
    </div>
  ));

  console.log(formData);

  return (
    <section className="SubscriptionModal">
      <h1>Complete the subscription form</h1>
      <form
        onSubmit={() => {
          handleSubmit(formData);
        }}
      >
        <div className="Modal-InputPart">
          <label>username:</label>
          <input
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
        </div>

        <div className="Modal-InputPart">
          <label>password:</label>
          <input
            type="password"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>

        {characsInputs}

        <input className="Modal-SubmitBtn" type="submit" value="Subscribe" />
      </form>
    </section>
  );
}
