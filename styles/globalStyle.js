import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
  font-family: Rubik;
  font-size: 10px;
}

body {
  margin: 0;
  height: 100%;
}
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

* {
  box-sizing: border-box;
  background-repeat: no-repeat;

  &::after,
  &::before {
    box-sizing: border-box;
    background-repeat: no-repeat;
  }
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

input:focus {
  outline: none;
}

input[type="submit"] {
  cursor: pointer;
}

button {
  cursor: pointer;
  outline: none;
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 -24px;
}
[class*="Container--"] {
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 24px;
}
.Container--fullWidth {
  width: 100%;
}
.Container--medium {
  max-width: 768px;
}
.Container--small {
  max-width: 360px;
}
`;
