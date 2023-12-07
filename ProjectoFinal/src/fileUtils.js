import fs from "fs/promises";

export const readData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeData = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};