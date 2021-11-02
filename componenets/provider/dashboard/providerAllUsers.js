import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/store";
import ProviderEachUser from "./providerEachUser";

//The component for generating the users list who are subscripted to the provider
export default function ProviderAllUsers() {
  const { globalState } = useContext(UserContext);
  const [userList, setUserList] = useState();

  useEffect(() => {
    const allUsers = globalState.subscriptedUsers;
    // console.log(allUsers);
    if (allUsers.length > 0) {
      setUserList(
        allUsers.map((item, index) => (
          <ProviderEachUser
            key={"subscriptedUser" + index}
            userInfo={item}
            userIndex={index}
            plan={globalState.providerPlans[item.plan_index]}
          />
        ))
      );
    }

    // console.log(userList)
  }, [globalState.subscriptedUsers]);
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
