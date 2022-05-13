import React, { useState } from "react";
import "./PreviewImage.css";
function PreviewImage({ profilePicture }) {
  const [preview, SetPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(profilePicture);
  reader.onload = () => {
    SetPreview(reader.result);
  };
  //  show the peview image which is selected
  return (
    <div>
      {preview ? (
        <img
          src={preview}
          alt="preview"
          width="60px"
          height="120px"
          className="PreviewImage"
        ></img>
      ) : (
        "loading.."
      )}
    </div>
  );
}

export default PreviewImage;
