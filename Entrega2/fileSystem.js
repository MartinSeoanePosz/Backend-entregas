import fs from 'fs';
const FILE_NAME = './archiveFileSync.txt';

async function createFile(text, fileName) {
    try {
        await fs.promises.writeFile(fileName ?? FILE_NAME, text ?? "Hola mundo");
    } catch (error) {
        console.log("Error while creating the file", error);
    }
}

async function readFile(fileName) {
    try {
        const result = await fs.promises.readFile(fileName ?? FILE_NAME);
        const data = JSON.parse(result.toString());
        console.log(data);
        console.log(data.nombre);
    } catch (error) {
        console.log("Error while reading the file", error);
    }
}
async function updateFile(text, fileName) {
    try {
        await fs.promises.appendFile(fileName ?? FILE_NAME, text ?? "Hola mundo");
    } catch (error) {
        console.log("Error while updating the file", error);
    }
}
async function deleteFile(fileName) {
    try {
        await fs.promises.unlink(fileName ?? FILE_NAME);
    } catch (error) {
        console.log("Error while deleting the file", error);
    }
}
export {createFile, readFile, updateFile, deleteFile};