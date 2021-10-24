import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link";
import data from "../../data/sideBar.json";
import { UserContext } from "../../context/store";
import { handleDataContext } from "../../context/handleData";
import { useRouter } from 'next/router'
import ToggleButton from '../gadjets/toggle'

//The component for generating the sidebar for each user according to his role as a provider or ordinary user
export default function SideBar() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(handleDataContext);
  const router = useRouter()
  const [select,setSelect] = useState(0)
  const type = globalState.user.type;
  const registerStatus = globalState.user.registered;
  let sideBarData;

  if (type === "user") {
    sideBarData = data.UserSideBar;
  } else if (type === "provider" && registerStatus) {
    sideBarData = data.ProviderSideBar;
  } else if (type === "provider" && !registerStatus) {
    sideBarData = data.signUpSideBar;
  } else {
    sideBarData = data.PublicSideBar;
  }
  useEffect(() => {
    setSelect(0)
    if(router.pathname.indexOf("profilesetting") > 0){
      sideBarData.menuItem.forEach((res, index)=>{
        if(res.name === "Profile Setting")
          setSelect(index)
      })
    } else if(router.pathname.indexOf("addnewplan") > 0){
      sideBarData.menuItem.forEach((res, index)=>{
        if(res.name === "Add Plan")
          setSelect(index)
      })
    } else if(router.pathname.indexOf("newOffers") > 0){
      sideBarData.menuItem.forEach((res, index)=>{
        if(res.name === "New Offers")
          setSelect(index)
      })
    }
  },[router.pathname,sideBarData])

  const sideBarMenuItems = sideBarData.menuItem.map(
    (item,index) =>
      (item.name !== "Profile Setting" || globalState.user.username) && (
        <li id={item.id} key={item.name} className={select===index? "select":""} onClick={()=>{
          setSelect(index)
          if(item.name === "Log Out"){
            handleLogOut();
          }
        }}>
          {item.url ? (<Link href={item.url}>
              <a>
            <embed src={item.item}/>
              <p>
                {item.name}
              </p>
              </a>
            </Link>
          ) : (
            <><embed src={item.item}/>
            <p>
              {item.name}
            </p>
            </>
          )}
        </li>
      )
  );


  return (
    <div className="SideBar">
      <ToggleButton />
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </div>
  );
}
