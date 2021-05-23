//Defining the redux actions using in the project
import * as actions from "./actionTypes";
import data from "../data/testData/sampleUser.json";

const user = data.user;

export function getUserLoggedIn() {
  return {
    type: actions.USER_LOGIN,
    payLoad: user,
  };
}
