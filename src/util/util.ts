import fs from "fs";
import Jimp = require("jimp");
const URL = require("url").URL;
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

// isUrlValid
// validator for input URL
// INPUT
//    testString: string input for validate
// OUTPUT:
//    return true if URL is valid, otherwise will return false
export function isUrlValid(testString: string){
  try {
    console.log("Validating URL...")
    const url = new URL(testString);
    console.log(`${testString} is a valid URL`);
    return true;
  }
  catch {
    console.error(`It seem '${testString}' is not a valid URL.`)
    return false;
  }
}