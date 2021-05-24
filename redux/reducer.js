//define the reducer function of the project
/*
state structure :

state : {
    user: {
        id: ...,
        type: ...,
        name: ...,
        description: ...,
        wallet: ...,
        network: ...
    },
    wallet : {
        id: ...,
        name: ...,
        logo: ...,
        credit: ...
    }
    definedPlans: [

        {
            id: ...,
            name: ...,
            provider: ...,
            duration:
            refundPolicy: ...,
            useAmmount: ...,
            tags: [tag1,tag2,tag3,..]
            payMethos: [
                {
                    coin1: ...,
                    logo: ...
                },
                {
                    coin1: ...,
                    logo: ...
                },
                ...
            ]
        },
        ...
    ],
    activePlans: [
        {
            id: ...,
            name: ...,
            provider: ...,
            activationDate: ...,
            expireDate: ... ,
            duration:
            refundPolicy: ...,
            useAmmount: ...,
            payMethods: [
                {
                    coin1: ...,
                    logo: ...
                },
                {
                    coin1: ...,
                    logo: ...
                },
                ...
            ]
        }
    ],

}
*/

import * as actions from "./actionTypes";

//Initializing the states
const initailState = {
  user: {},
  wallet: {},
  definedPlans: [],
  activePlans: [],
};

//Defining the reduxer function
export default function reducer(state = initailState, action) {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case actions.USER_GETPLANS:
      return {
        ...state,
        activePlans: {
          id: action.payload.id,
          name: action.payload.name,
          provider: action.payload.provider,
          activationDate: action.payload.activationData,
          expireDate: action.payload.expireDate,
          duration: action.payload.duration,
          refundPolicy: action.payload.refundPolicy,
          useAmmount: action.payload.useAmmount,
          payMethods: action.payload.payMethods,
        },
      };
    case actions.USER_GETWALLET:
      return {
        ...state,
        wallet: {
          id: action.payload.id,
          name: action.payload.name,
          logo: action.payload.logo,
          credit: action.payload.credit,
        },
      };
    default:
      return state;
  }
}
