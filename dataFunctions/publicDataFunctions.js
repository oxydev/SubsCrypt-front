//get user data function
import Cookies from 'js-cookie'
import data from '../data/testData/providerAddress.json'

const subscrypt = import('@oxydev/subscrypt')

export const checkAuthWithUserName = async (username, password, dispatch, setAuth) => {
  //Function that check the authentication of a provider by user name and password an if not check it with user.

  const provider = await (
    await subscrypt
  )
    .providerCheckAuthWithUsername(username, password)
    .then((result) => {
      if (result.result === true) {
        dispatch({
          type: 'LOAD_USER',
          payload: { username: username, password: password, type: 'provider' },
        })
        setAuth(true)
        Cookies.set('subscrypt', username)
        Cookies.set('subscryptPass', password)
        Cookies.set('subscryptType', 'provider')
      } else {
        checkUser(username, password)
      }
      return result.result
    })
    .catch((error) => {
      console.log(error)
    })

  //function for checking authentication of an ordinary user
  async function checkUser (username, password) {
    await (
      await subscrypt
    )
      .userCheckAuthWithUsername(username, password)
      .then((result) => {
        if (result.result === true) {
          dispatch({
            type: 'LOAD_USER',
            payload: { username: username, password: password, type: 'user' },
          })
          setAuth(true)
          Cookies.set('subscrypt', username)
          Cookies.set('subscryptPass', password)
          Cookies.set('subscryptType', 'user')
        } else {
          dispatch({ type: 'LOAD_USER', payload: { username: 'Invalid' } })
          setAuth(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

//Function for getting the user plan data after loging in
export const loadUserData = async (username, password, dispatch) => {
  await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
    dispatch({ type: 'LOAD_USER_PLANS', payload: result.result })
    return 'userLoaded'
  })
}

//Function for getting the user plan data after loging in
export const loadUserDataByWallet = async (walletAddress, dispatch) => {
  await (await subscrypt).retrieveWholeDataWithWallet(walletAddress).then((result) => {
    console.log(result)
    if (result.status === 'Fetched') {
      dispatch({ type: 'LOAD_USER_PLANS', payload: result.result })
    }
    return 'userLoaded'
  })
}

//Wallet connection
export const connectToWallet = async (wallets, type, dispatch, setAuth) => {
  await (await subscrypt).getWalletAccess()
  const accounts = await (await subscrypt).getWalletAccounts().then((result) => {
    if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
      var name = window.prompt(JSON.stringify(result[0].address) + '\n' + JSON.stringify(result[1].address) + '\n'
        + JSON.stringify(result[2].address) +'\n' + JSON.stringify(result[3].address) + '\n' + JSON.stringify(result[4].address) + '\nEnter number: '
      )
      console.log(name)

      dispatch({ type: 'LOAD_WALLETS', payload: result })
      dispatch({ type: 'LOAD_USER', payload: { type: type, userWallet: result[name] } })
      Cookies.set('subscryptWallet', result[name].address)
      setAuth(true)
    }
  })
  return accounts
}

//Get plans data of a provider
export const loadPlan = async (providerAddress, planIndex, dispatch) => {
  await (await subscrypt).getPlanData(providerAddress, planIndex).then((result) => {
    console.log(result)
    result.result.planIndex = planIndex
    // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
    getCharacs(providerAddress, planIndex, result.result)
  })

  async function getCharacs (address, index, plans) {
    await (await subscrypt).getPlanCharacteristics(address, index).then((result) => {
      console.log(result)
      if (result.status == 'Fetched') {
        plans.characteristics = result.result
        dispatch({ type: 'LOAD_PROVIDER_PLANS', payload: plans })
      }
    })
  }
}

//Refund a plan
export const refundPlan = async (address, injector, callback, providerAddress, planIndex) => {
  injector = await injector.then((res) => res)
  await (await subscrypt).refund(address, injector, callback, providerAddress, planIndex)
}

//Refund a plan
export const renewPlan = async (
  address,
  injector,
  callback,
  providerAddress,
  planIndex,
  charcteristicValue
) => {
  injector = await injector.then((res) => res)
  await (
    await subscrypt
  ).renew(address, injector, callback, providerAddress, planIndex, charcteristicValue)
}

export const subscribePlan = async (address, injector, callback, providerAddress, planIndex, user, pass, planChars) => {
  await (
    await subscrypt
  ).getSha2(pass).then(async (res) => {
    console.log(address, providerAddress, planIndex, res.result,
      user,
      planChars)
    injector = await injector.then((res) => res)
    await (
      await subscrypt
    ).subscribe(
      address,
      injector,
      callback,
      providerAddress,
      planIndex,
      res.result,
      user,
      planChars
    )
  })

}

//Get Injector
export const getWalletInjector = async (address) => {
  let injector
  await (await subscrypt).getInjector(address).then((result) => {
    injector = result
  })
  return injector
}

//Redesining the functions
export const checkAuthByCookie = (dispatch, setAuth) => {
  const userName = Cookies.get('subscrypt')
  const password = Cookies.get('subscryptPass')
  const userType = Cookies.get('subscryptType')
  const userWallet = Cookies.get('subscryptWallet')
  console.log('checkAuthbyCookie')
  if (userName) {
    setAuth(true)
    dispatch({
      type: 'LOAD_USER',
      payload: { username: userName, password: password, type: userType },
    })
    if (userType === 'user') {
      loadUserData(userName, password, dispatch)
    }
    if (userType === 'provider') {
      loadPlan(data.providerAddress, 0, dispatch)
    }
  } else if (userWallet) {
    setAuth(true)
    connectToWallet([], userType, dispatch, setAuth)
  }
}
