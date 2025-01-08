import express from "express";
import { creatRegexFromVessels, vessels } from "./dataRouter";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import sharp, { OutputInfo } from "sharp";
import fileUpload from "express-fileupload";
import baseURL from "../environment";

const router = express.Router();

// handles image upload
router.post(creatRegexFromVessels(vessels), (req, res, _next) => {
  console.log("Got file upload request");
  // images are associated with a vessel

  const vesselSlug = req.path;
  // not sure if body is accessible on file upload, would be nice for metadata like which Container the File belongs to, to remove on deletion
  // could also just run cleanup job to remove unused files
  // const body = req.body;

  // we will only allow single file upload with image called "image" and ignore the other files
  const files = req.files;
  console.log(process.env.NODE_ENV);
  if (files !== undefined) {
    console.log(files?.image);
    if (files && "image" in files && "mv" in files.image) {
      generateSingleSource(vesselSlug, files.image)
        .then(([path, info, blurDataURL]) => {
          res.send({
            path: path,
            height: info.height,
            width: info.width,
            blurDataURL,
          });
        })
        .catch((e) => {
          res.status(500);
          res.send("Some unknown error occurred");
          console.log(e);
        });
    }
  } else {
    res.status(400).send("no Files found in Request");
  }
});

/**
 * transforms a single image and returns a {@link Promise} that resolves to the URL of the saved Image
 * @param slug the slug this image is associated with
 * @param image
 */

const imageFolder = "/images";

async function generateSingleSource(
  slug: string,
  image: fileUpload.UploadedFile,
): Promise<[string, OutputInfo, string?]> {
  const compress = false;
  return new Promise<[string, OutputInfo, string?]>(async (resolve, reject) => {
    const randomID = uuidv4();

    // check if the folder exists
    if (!fs.existsSync(process.cwd() + imageFolder + slug)) {
      fs.mkdirSync(process.cwd() + imageFolder + slug);
    }

    if (compress) {
      processImage(image, process.cwd() + imageFolder + "/", randomID).then(
        ([i, info]) => {
          // removing temp image
          fs.unlink(image.tempFilePath, (err) =>
            err !== null ? reject(err) : null,
          );
          // resolving the URL of the image
          resolve([baseURL + imageFolder + "/" + i, info]);
        },
      );
    } else {
      const [i, info] = await saveImage(
        image,
        process.cwd() + imageFolder + slug + "/",
        randomID,
      );
      // create blurred image
      const buffer = await sharp(image.tempFilePath)
        .resize({ width: 80 })
        .blur(5)
        .jpeg()
        .toBuffer();
      const blurDataURL = `data:image/jpeg;base64,${buffer.toString("base64")}`;

      // removing temp image
      fs.unlink(image.tempFilePath, (err) =>
        err !== null ? reject(err) : null,
      );

      // resolving the URL of the image
      resolve([baseURL + imageFolder + slug + "/" + i, info, blurDataURL]);
    }
  });
}

/**
 *
 */
async function saveImage(
  image: fileUpload.UploadedFile,
  folder: string,
  filename: string,
): Promise<[string, OutputInfo]> {
  return new Promise<[string, OutputInfo]>((resolve, reject) => {
    sharp(image.tempFilePath)
      .metadata()
      .then((metadata) => {
        const format = metadata.format;
        sharp(image.tempFilePath)
          .toFile(folder + filename + "." + format)
          .then((info) => {
            resolve([filename + "." + format, info]);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

/**
 *
 * @param image the image to transform and save to storage
 * @param folder the folder where to store the image
 * @param filename the name to store the file under without file extension
 * @param format the file format to save under supports webp and jpg
 * @param quality integer 1-100 (optional, default 80)
 */
async function processImage(
  image: fileUpload.UploadedFile,
  folder: string,
  filename: string,
  format: "webp" | "jpg" = "jpg",
  quality: number = 80,
): Promise<[string, OutputInfo]> {
  return new Promise<[string, OutputInfo]>((resolve, reject) => {
    // converting image to webp and saving to images folder
    if (format === "webp") {
      sharp(image.tempFilePath)
        .webp({ quality: quality })
        .toFile(folder + filename + ".webp")
        .then((info) => {
          resolve([filename + ".webp", info]);
        })
        .catch((e) => reject(e));
    } else {
      sharp(image.tempFilePath)
        .jpeg()
        .toFile(folder + filename + ".jpg")
        .then((info) => {
          resolve([filename + ".jpg", info]);
        })
        .catch((e) => reject(e));
    }
  });
}

export default router;
