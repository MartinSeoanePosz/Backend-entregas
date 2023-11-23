import fs, { writeFile } from 'fs';
import { createFile, readFile, updateFile, deleteFile } from './fileSystem.js';
import ProductManager from './ProductManager.js';

const FILE_NAME = './ejemploJSON.txt';

async function main() {
     // Check if the file exists and if it doesnt, create it
    const existFile = fs.existsSync(FILE_NAME);
    if (!existFile) {
        await createFile(FILE_NAME);
        await readFile(FILE_NAME);
    }

    const productManager = new ProductManager();

    // Agrega 3 productos al archivo
    try {
        const product1 = productManager.addProduct("Product 1", "Description 1", 20.99, "thumbnail1.jpg", "P1", 100);
        console.log("New Product 1:", product1);

        const product2 = productManager.addProduct("Product 2", "Description 2", 15.49, "thumbnail2.jpg", "P2", 50);
        console.log("New Product 2:", product2);

        const product3 = productManager.addProduct("Product 3", "Description 3", 30.00, "thumbnail3.jpg", "P3", 75);
        console.log("New Product 3:", product3);

        // Actualiza el archivo con los 3 productos
        await createFile(JSON.stringify(productManager.getProduct(), null, 2), FILE_NAME);
    } catch (error) {
        console.error("Error adding product:", error.message);
    }

    // Agrega un cuarto producto al archivo
    try {
        const addedProduct = productManager.addProduct("Product 4", "Description 4", 25.00, "thumbnail4.jpg", "P4", 50);
        console.log("New Product 4:", addedProduct);

        // Actualiza el archivo con los 4 productos
        await updateFile(JSON.stringify(productManager.getProductById(addedProduct.id), null, 2), FILE_NAME);
    } catch (error) {
        console.error("Error adding product:", error.message);
    }

    // Llama a todos los productos
    const allProducts = productManager.getProduct();
    console.log("All Products:", allProducts);

    // Llama a un producto por ID
    try {
        const productById = productManager.getProductById(3);
        console.log("Product by ID:", productById);
    } catch (error) {
        console.error("Error getting product by ID:", error.message);
    }

    console.log("Existe el archivo: ", existFile);

    // Borra el archivo
    // await deleteFile(FILE_NAME);
}

main();
