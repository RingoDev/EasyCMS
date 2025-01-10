import React, { useState, useRef, ChangeEvent } from "react";
import { Picture } from "../types/types";
import uploadImage from "../lib/uploadImage";

interface Props {
  setImageData: (image: Picture) => void;
  imageData: Picture;
  slug: string;
}

/**
 * displays and uploads a single image to the backend
 * @param slug the slug this picture is associated with
 * @param setImageData function to call with the image when it is uploaded
 * @param imageData the current image to display
 */
const ImageUpload: React.FC<Props> = ({ slug, setImageData, imageData }) => {
  const [uploadedFileURL, setUploadedFileURL] = useState<string>(imageData.src);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number>();

  /**
   * uploads a file to the backend server
   * @param e
   */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    // only take the first file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // show Image
      setUploadedFileURL(URL.createObjectURL(file));

      uploadImage(reader, file, slug, e, setProgress).then((r) => {
        setUploadedFileURL(r.src);
        setImageData(r);
      });
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        className="fileInput"
        type="file"
        onChange={(e) => handleImageChange(e)}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/*<div>*/}
        {uploadedFileURL !== undefined ? (
          <>
            <img
              style={{ maxHeight: "8rem" }}
              src={uploadedFileURL}
              alt={"Something i cant explain"}
            />
            {progress !== 0 && progress !== 1 && progress !== undefined ? (
              <div>{Math.round(progress * 100)}%</div>
            ) : null}
          </>
        ) : (
          <div className="previewText">Please select an Image for Preview</div>
        )}
        {/*</div>*/}
        <button onClick={() => inputRef.current?.click()}>
          Foto auswählen
        </button>
      </div>
    </>
  );
};

export default ImageUpload;
