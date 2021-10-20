import React,{useState} from "react";


const Card =(props)=>{
  const[select,setSelect]=useState(false)


  return(
    <div className="Selection" onClick={()=>select===false?setSelect(true):setSelect(false)}>
      <div>
        <img src={props.props.imageURL} alt=""/>
        <span className={select===true?"ok":"select"}></span>
      </div>
      <p className="Topic">{props.props.name}</p>
    </div>
  )
}


export default Card;