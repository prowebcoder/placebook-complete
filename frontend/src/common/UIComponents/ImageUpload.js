import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewURL, setPreviewURL] = useState();
  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImage = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        accept=".jpg,.png,.jpeg"
        id={props.id}
        style={{ display: "none" }}
        onChange={pickedImage}
      />
      <div className={`image-upload`}>
        <div className="image-upload__preview">
          {previewURL && <img src={previewURL} alt="preview"></img>}
          {!previewURL && <p>Please Pick an image</p>}
        </div>

        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
