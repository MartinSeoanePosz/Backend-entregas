import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

export const FILE_NAME = fileURLToPath(import.meta.url);
export const DIR_NAME = dirname(FILE_NAME);

async function readFile(filename) {
  try {
    let readfilename = DIR_NAME + "/" + filename;
    let result = await fs.promises.readFile(DIR_NAME + "/" + filename, "utf-8");
    let data = await JSON.parse(result);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function writeFile(filename, data) {
  try {
    await fs.promises.writeFile(DIR_NAME + "/" + filename, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function deleteFile(filename) {
  try {
    await fs.promises.unlink(DIR_NAME + "/" + filename);
    return true;
  } catch (err) {
    console.log(err);
  }
}

export default { readFile, writeFile, deleteFile };