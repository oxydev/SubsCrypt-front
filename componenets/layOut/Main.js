import React from "react";
import styled from "styled-components";

//Styles for Main content part
const MainPart = styled.div`
  width: 100%;
  padding: 0 47px 0 82px;
  overflow-y: auto;
`;

//The component for showing the main content part of the page (the right part of the page)
export default function Main(props) {
  return <MainPart className="MainPart">{props.children}</MainPart>;
}
