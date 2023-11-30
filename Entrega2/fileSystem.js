import fs from "fs";
const FILE_NAME = "./products.txt";

async function createFile(text, filename) {
  try {
    await fs.promises.writeFile(filename ?? FILE_NAME, text ?? "Hola mundo");
  } catch (error) {
    console.log("Error writting the file", error);
  }
}

async function readFile(filename) {
  try {
    const result = await fs.promises.readFile(filename ?? FILE_NAME);
    const data = JSON.parse(result.toString());
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error reading the file", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

async function updateFile(text, filename, append = false) {
  try {
    if (append) {
    await fs.promises.appendFile(filename ?? FILE_NAME, text ?? "Hola mundo");
    } else {
        await fs.promises.writeFile(filename ?? FILE_NAME, text ?? "Hola mundo");
    }
    } catch (error) {
        console.log("Error updating the file", error);
  }
}

async function deleteFile(filename) {
  try {
    await fs.promises.unlink(filename ?? FILE_NAME);
  } catch (error) {
    console.log("Error deleting the file", error);
  }
}

export { createFile, readFile, updateFile, deleteFile };