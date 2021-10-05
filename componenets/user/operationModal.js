import React, { useContext ,useEffect} from 'react'
import styled from "styled-components"
import { modalContext } from '../../context/modal'


const Root =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: ${({ theme }) => theme.FontSize.fontSizeBodySmall};
      font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
      color: ${({ theme }) => theme.Primary.primary};
      line-height: 1.4;
      margin-bottom: 15px;
    }

    button {
    height: 35px;
    padding: 5px 10px;
    display: inline-block;
    border-radius: ${({ theme }) => theme.BorderRadius.$borderRadiusSmall};
    background: ${({ theme }) => theme.Background.purpleBGLinear};
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
    font-weight: ${({ theme }) => theme.Weight.fontWeightRegular};
    line-height: 1.4;
    color: ${({ theme }) => theme.Color.white};
    &:hover {
      box-shadow: ${({ theme }) => theme.Shadows.boxShadowCard};
    }
    margin-top: 20px;
    width: 100%;
    cursor: pointer;
  }
  
`


export default function OperationModal(props) {
  const {modal,setModal,setCallBack } = useContext(modalContext);

  useEffect(()=>{
    setCallBack(()=>()=>{
      setModal(null)
    })
  },[modal])

  return (
    <Root>
      <h3>{props.text}</h3>
      <button onClick={()=>{setModal(null);}}>ok</button>
    </Root>
  );
}