import React, { useContext } from "react";
import data from "../../../data/transactions.json";
import { UserContext } from "../../../context/store";
import ProviderEachUser from "./providerEachUser";

export default function ProviderAllUsers(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const allUsers = globalState.subscriptedUsers;
  let userList;
  if (globalState.providerPlans.length > 0) {
    userList = allUsers.map((item, index) => (
      <ProviderEachUser userInfo={item} userIndex={index} />
    ));
  }
  return (
    <section className="ProviderAllUsers">
      <h1>All subscripted Users</h1>
      <table>
        <thead>
          <tr>
            <th>User No.</th>
            <th>Plan</th>
            <th>Subscryption Time</th>
            <th>Duration</th>
            <th>Amount</th>
            <th>characteristics</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    </section>
  );
}
