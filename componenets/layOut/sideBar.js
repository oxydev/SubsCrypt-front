import React, { useContext ,useState} from "react";
import Link from "next/link";
import data from "../../data/sideBar.json";
import { UserContext } from "../../context/store";
import { handleDataContext } from "../../context/handleData";

//The component for generating the sidebar for each user according to his role as a provider or ordinary user
export default function SideBar() {
  const { globalState } = useContext(UserContext);
  const { handleLogOut } = useContext(handleDataContext);
  const[select,setSelect]=useState(0)
  const type = globalState.user.type;
  const registerStatus = globalState.user.registered;
  let sideBarData;
  if (type == "user") {
    sideBarData = data.signInSideBar;
  } else if (type == "provider" && registerStatus) {
    sideBarData = data.ProviderSideBar;
  } else if (type == "provider" && !registerStatus) {
    sideBarData = data.signUpSideBar;
  } else if(type==="sign_in"){
    sideBarData=data.signInSideBar
  }else{
    sideBarData = data.PublicSideBar;
  }



  const sideBarMenuItems = sideBarData.menuItem.map(
    (item,index) =>
      (item.name != "Profile Setting" || globalState.user.username) && (
        <li key={item.name} className={select===index? "select":""} onClick={()=>setSelect(index)}>
          {item.url ? (
            <Link href={item.url}>
              <a
                id={item.id}
                onClick={
                  item.name == "Log Out"
                    ? () => {
                        handleLogOut();
                      }
                    : () => {}
                }
              >
                {item.name}
              </a>
            </Link>
          ) : (
            <>
              <embed src={item.item}/>
            <p
              id={item.id}
              onClick={
                item.name == "Log Out"
                  ? () => {
                      handleLogOut();
                    }
                  : () => {}
              }
            >
              {item.name}
            </p>
            </>
          )}
        </li>
      )
  );


  return (
    <div className="SideBar">
      <ul className="SideBarNav">{sideBarMenuItems}</ul>
      <img className="SideBar-logo" src="/logo/Logo--light.png"></img>
    </div>
  );
}
