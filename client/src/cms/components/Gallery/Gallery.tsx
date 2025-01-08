import React, { ChangeEvent, useRef, useState } from "react";
import { Picture } from "../../types/types";
import styles from "./gallery.module.css";
import uploadImage from "../../lib/uploadImage";
import { MinusButton, PlusButton } from "../Button/Button";

interface Props {
  images: Picture[];
  setImages: (p: Picture[]) => void;
  slug: string;
}

const Gallery: React.FC<Props> = ({ images, setImages, slug }) => {
  const [, setProgress] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);

  const addPicture = (pic: Picture) => {
    const newImages = images.slice();
    newImages.push(pic);
    setImages(newImages);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    // only take the first file
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];

      uploadImage(reader, file, slug, e, setProgress)
        .then((r) => addPicture(r))
        .catch((e) => console.log(e));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {images.map((i, index) => {
          const removeImage = () => {
            const newImages = images.slice();
            newImages.splice(index, 1);
            setImages(newImages);
          };
          return (
            <div key={i.src} className={styles.galleryContainer}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img style={{ maxHeight: "8rem" }} src={i.src} alt={i.alt} />
              </div>
              <div className={styles.imageOverlay}>
                <MinusButton onClick={removeImage} />
              </div>
            </div>
          );
        })}
      </div>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        className="fileInput"
        type="file"
        onChange={handleChange}
      />
      <div style={{ padding: "1rem" }}>
        <PlusButton onClick={() => inputRef.current?.click()} />
      </div>
    </div>
  );
};

export default Gallery;
