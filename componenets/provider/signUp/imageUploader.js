import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Gray } from "../../../styles/variables";

const Image = styled.div`
  &.ImageUploader {
    margin: 30px 0;
    button {
      display: block;
      width: 128px;
      height: 128px;
      border-radius: 50%;
      border: 2px dashed ${Gray.gray4};
      margin: auto;
      background-color: transparent;
      background-image: url("/icons/png/uploadButton.png");
      background-position: center;
      background-size: 128px;
    }

    input {
      display: none;
    }

    .FileName {
      margin: 20px 0 10px;
      text-align: center;
    }
  }
`;

//The component for generating the image uploader part in provider sign up form
export default function ImageUploader(props) {
  const { info, setInfo } = props;
  const inputRF = useRef(null);
  const [file, setFile] = useState();
  const [url, setUrl] = useState("/icons/png/uploadButton.png");

  //Function for handling the input file chnaging
  function inputChangeHandler(e) {
    uploadHandler(e.target.files[0]);
  }

  //Function for image uploading process
  function uploadHandler(file) {
    // console.log(file);
    const newUrl = URL.createObjectURL(file);
    setUrl(newUrl);
    // console.log(newUrl);
    setFile(file);
    setInfo({ ...info, image: file });
  }

  //Function for handling click on the input link
  function handleUploadClick() {
    inputRF.current.click();
  }

  //Function for handling drag and drop on the upload field
  function dropHandler(e) {
    // console.log("File(s) dropped");
    e.preventDefault();
    if (e.dataTransfer.items) {
      if (e.dataTransfer.items[0].kind === "file") {
        // console.log(e.dataTransfer.items[0]);
        let file = e.dataTransfer.items[0].getAsFile();
        uploadHandler(file);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        let file = e.dataTransfer.files[0].name;
        uploadHandler(file);
      }
    }
  }
  //Prevent the default behavior of the browser when drag and drop
  function dragOverHandler(e) {
    e.preventDefault();
  }
  return (
    <Image className="ImageUploader">
      <div
        className="UploadZone"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        <button
          style={{ backgroundImage: `url(${url})` }}
          onClick={(e) => {
            e.preventDefault();
            handleUploadClick();
          }}
        ></button>
        <input
          ref={inputRF}
          type="file"
          id="upload"
          name="upload"
          onChange={inputChangeHandler}
        />
      </div>
      <p className="FileName">{file ? file.name : ""}</p>
    </Image>
  );
}
