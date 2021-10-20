import React, { useState } from 'react'
import data from "../../data/wallets&networks.json";
import Card from './card'

export default function Connection() {
  const[show,setShow]=useState(false);


  const users = data.user.map((item) => (
    <Card key={item.name}  props={item} />
  ));
  const networks = data.networks.map((item) => (
    <Card key={item.name} props={item} />
  ));
  const wallets =data.wallets.map((item)=>(
    <li>
      <img src={item.imageURL} alt=""/>
      <div className="Wallet">
        <p>{item.name}</p>
        <p className="Address">{item.address}</p>
      </div>
    </li>
  ))


  return (
    <div className="LoginPage SingInPage">
      <h1 className="Title">Connect your wallet</h1>
      <p className="Topic">Network</p>
      {networks}
      <p className="Topic">Choose Role</p>
      <div className="chooseRole">
        {users}
      </div>
      <p className="Topic">Choose Wallet</p>
      <div className="SelectWallet">
        <div className="Select">
          <p>Select Wallet</p>
          <span onClick={()=>show===false?setShow(true):setShow(false)}> </span>
        </div>
        <ul className={show===true?"DropDown":"hidden"}>
          {wallets}
          <input type="submit" value="Login"/>
        </ul>
        <p>Select from the list</p>
      </div>
      <div className="Divider">
        <div></div>
        <p>or sign up with Username</p>
        <div></div>
      </div>
    </div>
  );
}


