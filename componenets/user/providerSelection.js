import { useContext, useRef } from "react";
import { UserContext } from "../../context/Store";
import styled from "styled-components";

const Section=styled.div`
&.ProviderSelection {
  margin: 20px 0;
  form {
    label {
      font-size: ${({theme})=>theme.FontSize.fontSizeBodyLightSmall};
      font-weight: ${({theme})=>theme.Weight.fontWeightLight};
      line-height: 1.4;
      color: ${({theme})=>theme.Gray.gray3};
      display: block;
      margin-bottom: 10px;
    }
    & > div {
      display: flex;
    }
    input[type="text"] {
      width: 70%;
      height: 48px;
      line-height: 4.8rem;
      border: 1px solid #c4c7cc;
      border-radius: ${({theme})=>theme.BorderRadius.borderRadiusRegular};
      margin-bottom: 23px;
      padding: 0 18px;
      font-weight: ${({theme})=>theme.Weight.fontWeightRegular};
      color: ${({theme})=>theme.Primary.primary};
      font-size: 1.1rem;
      &::placeholder {
        color: ${({theme})=>theme.Gray.gray_5};
      }
    }
    input[type="submit"],
    button {
      width: 100px;
      height: 48px;
      line-height: 4.8rem;
      border-radius: ${({theme})=>theme.BorderRadius.borderRadiusRegular};
      margin-bottom: 23px;
      padding: 0 26px;
      background: ${({theme})=>theme.Background.purpleBGLinear};
      border: none;
      outline: none;
       font-size: ${({theme})=>theme.FontSize.fontSizeBodySmall};
      font-weight: ${({theme})=>theme.Weight.fontWeightRegular};
      color: ${({theme})=>theme.Color.white};
      flex-shrink: 0;
      margin-left: 10px;
    }
    button {
      width: unset;
      background: transparent;
      border: 1px solid ${({theme})=>theme.Gray.gray_5};
      color: ${({theme})=>theme.Gray.gray3};
    }
  }
}

`

export default function ProviderSelection() {
  const { dispatch } = useContext(UserContext);
  const textRef = useRef(null);

  const handleSubmit = () => {
    const provider = textRef.current.value;
    dispatch({ type: "LOAD_OFFER_ADDRESS", payload: provider });
  };

  const handleSetDefault = () => {
    textRef.current.value = "5HWLj7XsXETx85nHsSHPbAaQdCdDmT5aJT73pSUGsM28pyfk";
    dispatch({
      type: "LOAD_OFFER_ADDRESS",
      payload: "5HWLj7XsXETx85nHsSHPbAaQdCdDmT5aJT73pSUGsM28pyfk",
    });
  };
  return (
    <Section className="ProviderSelection">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>Input the Provider username or address</label>
        <div>
          <input type="text" ref={textRef} />
          <input type="submit" value="Submit" />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSetDefault();
            }}
          >
            Default Provider
          </button>
        </div>
      </form>
    </Section>
  );
}
