import React from "react";
import styled from "styled-components";

const Load = styled.div`
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, pink, purple);
    animation: animate 0.5s linear infinite;
    & > span {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .loading-spinner:before {
    content: "";
    width: 80%;
    height: 80%;
    z-index: 10;
    border-radius: 50%;
    background-color: #fff;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

//The component for showing the loading spinner on screen.
export default function Loading() {
  return (
    <Load className="Loading">
      <div className="loading-spinner">
        <span></span>
      </div>
    </Load>
  );
}
