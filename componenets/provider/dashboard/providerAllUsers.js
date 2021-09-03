import React, { useContext } from "react";
import { UserContext } from "../../../context/store";
import ProviderEachUser from "./providerEachUser";
import styled from "styled-components";
import { FontSize, Weight, Primary, Gray } from "../../../styles/variables";

const AllUsers = styled.section`
  &.ProviderAllUsers {
    position: relative;
    & > h1 {
      font-size: ${FontSize.fontSizeBodyLarge};
      font-weight: ${Weight.fontWeightMedium};
      color: ${Primary.primary};
      line-height: 1.4;
      margin-bottom: 31px;
    }
    table {
      font-size: ${FontSize.fontSizeBodyLightSmall};
      font-weight: ${Weight.fontWeightLight};
      line-height: 1.4;
      color: ${Gray.gray3};
      text-align: left;
      width: 100%;
      thead {
        tr {
          th {
            font-weight: ${Weight.fontWeightRegular};
            border-bottom: 1px solid ${Gray.gray5};
            padding: 5px 10px;
            &:first-child {
              @include text-body--small--regular;
              font-size: ${FontSize.fontSizeBodySmall};
              font-weight: ${Weight.fontWeightRegular};
              color: ${Primary.primary};
              line-height: 1.4;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 24px 10px 24px;
            border-bottom: 1px solid ${Gray.gray5};
            img {
              width: 20px;
              height: 20px;
              display: inline-block;
              vertical-align: middle;
            }
            .userCharacteristics {
              display: flex;
              align-items: center;
              justify-content: space-between;
              h4 {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
`;

//The component for generating the users list who are subscripted to the provider
export default function ProviderAllUsers() {
  const { globalState } = useContext(UserContext);
  const allUsers = globalState.subscriptedUsers;
  let userList;
  console.log(allUsers);
  if (
    globalState.providerPlans.length > 0 &&
    globalState.providerPlans.length == globalState.user.plansCount
  ) {
    userList = allUsers.map((item, index) => (
      <ProviderEachUser
        key={"subscriptedUser" + index}
        userInfo={item}
        userIndex={index}
      />
    ));
  }
  return (
    <AllUsers className="ProviderAllUsers">
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
    </AllUsers>
  );
}
