import { Router } from "express";
import { readData, writeData } from "../fileUtils.js";

const router = Router();
const PRODUCTS_FILE = "./src/data/products.json";

router.get("/", async (req, res) => {
    try {
        const productData = await readData(PRODUCTS_FILE);
        res.json({ message: productData.length === 0 ? "No products" : "Products list", data: productData });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await readData(PRODUCTS_FILE);

        const product = productData.find((product) => product.id === parseInt(id));

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, category, stock } = req.body;

        if (!title || !description || !price || !thumbnail || !code || !category || !stock) {
            return res.status(400).json({ error: "Missing information." });
        }
        const productData = await readData(PRODUCTS_FILE);

        if (productData.find((product) => product.code === code)) {
            console.log("Product with the same code already exists. Not adding a new product.");
            return res.status(400).json({ error: "Product with the same code already exists." });
        }
        const maxId = Math.max(...productData.map(product => product.id), 0);

        const newProduct = {
            id: maxId + 1, 
            title,
            description,
            price,
            thumbnail,
            code,
            category,
            stock
        };
        productData.push(newProduct);
        currentId = newProduct.id + 1;

        await writeData(PRODUCTS_FILE, productData);

        res.status(201).json({ message: "Product created", data: newProduct });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, thumbnail, code, category, stock } = req.body;
        const productData = await readData(PRODUCTS_FILE);
        const indexProduct = productData.findIndex((product) => product.id === parseInt(id));

        if (indexProduct !== -1) {
            const updatedProduct = {
                id: parseInt(id),
                title,
                description,
                price,
                thumbnail,
                code,
                category,
                stock,
            };
            productData.splice(indexProduct, 1, updatedProduct);

            await writeData(PRODUCTS_FILE, productData);

            res.json({ message: "Product updated", data: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await readData(PRODUCTS_FILE);
        const indexProduct = productData.findIndex((product) => product.id === parseInt(id));

        if (indexProduct !== -1) {
            const deletedProduct = productData[indexProduct];
            productData.splice(indexProduct, 1);

            await writeData(PRODUCTS_FILE, productData);

            res.json({ message: "Product deleted", data: deletedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
