import React from "react";

//The component for showing the main content part of the page (the right part of the page)
export default function Main(props) {
  return <div className="MainPart">{props.children}</div>;
}
