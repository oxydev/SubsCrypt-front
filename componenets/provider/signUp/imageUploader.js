import React, { useRef, useState } from "react";

export default function ImageUploader() {
  const inputRF = useRef(null);
  const [file, setFile] = useState();
  const [url, setUrl] = useState("/icons/png/uploadBtn.png");

  let reader = new FileReader();

  function inputChangeHandler(e) {
    uploadHandler(e.target.files[0]);
  }

  function uploadHandler(file) {
    console.log(file.name);
    const newUrl = reader.readAsDataURL(file);
    setUrl(newUrl);
    console.log(newUrl);
    setFile(file);
  }

  function handleUploadClick() {
    inputRF.current.click();
  }
  function dropHandler(e) {
    console.log("File(s) dropped");
    e.preventDefault();

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items[0].kind === "file") {
        let file = e.dataTransfer.items[0].getAsFile();
        uploadHandler(file);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        let file = e.dataTransfer.files[0].name;
        uploadHandler(flie);
      }
    }
  }
  function dragOverHandler(e) {
    e.preventDefault();
  }
  return (
    <div className="ImageUploader">
      <div className="UploadZone" onDrop={dropHandler} onDragOver={dragOverHandler}>
        <a
          href="javascript:;"
          style={{ backgroundColor: `${url}` }}
          onClick={() => {
            handleUploadClick();
          }}
        ></a>
        <input ref={inputRF} type="file" id="upload" name="upload" onChange={inputChangeHandler} />
      </div>
      <p className="FileName">{file ? file.name : ""}</p>
    </div>
  );
}
