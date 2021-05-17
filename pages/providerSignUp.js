import React from "react";
import NewPlanCreation from "../componenets/provider/newPlanCreation";
import ProviderInfo from "../componenets/provider/signUp/providerInfo";

export default function ProviderSignUp(props) {
  return (
    <div className="ProviderSignUp">
      <div>
        <ProviderInfo />
        <NewPlanCreation />
        <div className="ProviderRegisteration">
          <p>
            For signing up you need to send a transaction on chain to put the data in smart contract
            on blockchain. Normal gas fee applies.
          </p>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
