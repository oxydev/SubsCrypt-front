import React, { useContext } from "react";
import { UserContext } from "../../../context/store";
import ProviderEachUser from "./providerEachUser";

//The component for generating the users list who are subscripted to the provider
export default function ProviderAllUsers() {
  const { globalState } = useContext(UserContext);
  const allUsers = globalState.subscriptedUsers;
  let userList;
  // console.log(allUsers);
  if (
    globalState.providerPlans.length > 0 &&
    globalState.providerPlans.length == globalState.user.plansCount
  ) {
    allUsers.forEach((user)=>console.log(user))
    userList = allUsers.map((item, index) => (
      <ProviderEachUser key={"subscriptedUser" + index} userInfo={item} userIndex={index} />
    ));
  }
  return (
    <section className="ProviderAllUsers">
      <h1>All Subscribed Users</h1>
      <table>
        <thead>
          <tr>
            <th>User No.</th>
            <th>Plan</th>
            <th>Subscription Time</th>
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
