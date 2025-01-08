import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

/**
 * Tries uuid4 Filenames until one isn't in use
 */
export const getUnusedFileName = async (
  directory: string,
  fileEnding: "pdf" | "webp" | string,
) => {
  return new Promise<string>((res, rej) => {
    let randomID = uuidv4();
    fs.access(directory + "/" + randomID + "." + fileEnding, (err) => {
      if (err) {
        // file doesn't exist yet so go ahead and resolve
        res(randomID + "." + fileEnding);
      } else {
        // try again with new uuid
        getUnusedFileName(directory, fileEnding)
          .then((fileName) => res(fileName))
          .catch((err) => rej(err));
      }
    });
  });
};
