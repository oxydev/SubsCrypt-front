import { useContext, useRef } from "react";
import { UserContext } from "../../context/store";

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
    <div className="ProviderSelection">
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
    </div>
  );
}