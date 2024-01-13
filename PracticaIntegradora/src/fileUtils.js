// import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname  = dirname(__filename);

// async function readFile(filename) {
//   try {
//     let readfilename = __dirname + "/" + filename;
//     let result = await fs.promises.readFile(__dirname  + "/" + filename, "utf-8");
//     let data = await JSON.parse(result);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function writeFile(filename, data) {
//   try {
//     await fs.promises.writeFile(__dirname  + "/" + filename, JSON.stringify(data));
//     return true;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteFile(filename) {
//   try {
//     await fs.promises.unlink(__dirname  + "/" + filename);
//     return true;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default { readFile, writeFile, deleteFile };