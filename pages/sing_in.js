import React, { useContext ,useState} from 'react'
import LoginPart from '../componenets/login/loginPart'
import { handleDataContext } from '../context/handleData'



const SingIn =()=>{
  const[show,setShow]=useState(false)
  const[select,setSelect]=useState(false)
  const[topic,setTopic]=useState(false)
  const { handleSubscriberloginByUsername } = useContext(handleDataContext);


  return(
    <div className="LoginPage SingInPage">
      <h1 className="Title">Connect your wallet</h1>
        <p className="Topic">Network</p>
        <div className="Selection" onClick={()=>select===false?setSelect(true):setSelect(false)}>
          <div>
            <span></span>
            <span className={select===true?"ok":"select"}></span>
          </div>
          <p className="Topic">Polkadot</p>
        </div>
        <p className="Topic">Choose Role</p>
        <div className="chooseRole">
          <div className="Selection" onClick={()=>!topic?setTopic(true):setTopic(false)}>
            <div>
              <span></span>
              <span className={topic===false?"select":"ok"}></span>
            </div>
            <p className="Topic">Subscriber</p>
          </div>
          <div className="Selection" onClick={()=>topic?setTopic(false):setTopic(true)}>
            <div>
              <span></span>
              <span className={topic===false?"ok":"select"}></span>
            </div>
            <p className="Topic">Provider</p>
          </div>
        </div>
      <p className="Topic">Choose Wallet</p>
      <div className="SelectWallet">
        <div className="Select">
          <p>Select Wallet</p>
          <span onClick={()=>show===false?setShow(true):setShow(false)}></span>
        </div>
        <ul className={show===true?"DropDown":"hidden"}>
          <li>
            <span></span>
            <div className="Wallet">
              <p>Metamask</p>
              <p className="Address">fj5x...lkc8</p>
            </div>
          </li>
          <li>
            <span></span>
            <div className="Wallet">
              <p>Metamask</p>
              <p className="Address">fj5x...lkc8</p>
            </div>
          </li>
          <li>
            <span></span>
            <div className="Wallet">
              <p>Metamask</p>
              <p className="Address">fj5x...lkc8</p>
            </div>
          </li>

          <input type="submit" value="Login"/>
        </ul>
        <p>Select from the list</p>
      </div>
      <div className="Divider">
        <div></div>
        <p>or sign up with Username</p>
        <div></div>
      </div>
      <LoginPart handler={handleSubscriberloginByUsername}/>
    </div>
  )
}


export default SingIn