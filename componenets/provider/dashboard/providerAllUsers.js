import React, { useContext } from "react";
import data from "../../../data/transactions.json";
import { UserContext } from "../../../context/store";
import ProviderEachUser from "./providerEachUser";

export default function ProviderAllUsers(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const allUsers = globalState.subscriptedUsers;
  let userList;
  if (allUsers.length > 0) {
    userList = allUsers.map((item, index) => (
      <ProviderEachUser userInfo={item} userIndex={index} />
    ));
  }
  return (
    <section className="ProviderAllUsers">
      <h1>All Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>User No.</th>
            <th>Plan</th>
            <th>Subscryption Time</th>
            <th>Duration</th>
            <th>Ammount</th>
            <th>characteristics</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    </section>
  );
}
