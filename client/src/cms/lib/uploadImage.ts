import axios from "axios";
import { ChangeEvent } from "react";
import { Picture } from "../types/types";

/**
 * uploads a file to the backend server
 * @param slug
 * @param file
 * @param setProgress
 */
const uploadImageToServer = (
  slug: string,
  file: File,
  setProgress: (p: number) => void,
): Promise<Picture> => {
  return new Promise<Picture>((res, rej) => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post<{
        path: string;
        alt?: string;
        height: number;
        width: number;
        blurDataURL: string;
      }>(import.meta.env.VITE_BACKEND_URL! + "/api/image" + slug, formData, {
        onUploadProgress: (p) => {
          setProgress(p.loaded / (p.total ? p.total : 100_000));
          console.log(p);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) =>
        res({
          src: r.data.path,
          alt: r.data.alt ? r.data.alt : "",
          width: r.data.width,
          height: r.data.height,
          blurDataURL: r.data.blurDataURL,
        }),
      )
      .catch((e) => rej(e));
  });
};
const uploadImage = (
  reader: FileReader,
  file: File,
  slug: string,
  e: ChangeEvent<HTMLInputElement>,
  setProgress: (progress: number) => void,
) => {
  return new Promise<Picture>((res, rej) => {
    e.preventDefault();
    reader.onloadend = () => {
      uploadImageToServer(slug, file, setProgress)
        .then((r) => res(r))
        .catch((e) => rej(e));
    };
    reader.readAsDataURL(file);
  });
};

export default uploadImage;
