import React from 'react'
import LoginPart from '../componenets/login/loginPart'
import Connection from '../componenets/login/connection'


const SingIn =()=>{


    return(
      <div className="LoginPage SingInPage">
        <Connection/>
        <LoginPart />
      </div>
    )


}


export default SingIn