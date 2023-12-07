import express from "express";

const app = express();
const PORT = 8080;
let products = [];
let currentID = 0;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/products", (req, res) => {
  res.json({ data: products });
});

app.get("/api/products/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let indexProduct = products.findIndex((product) => product.id === id);
  if (indexProduct !== -1) {
    res.json({ data: products[indexProduct] });
  } else {
    res.json({ mensaje: "Product not found" });
  }
});

app.post("/api/product", (req, res) => {
  let { title, description, price, thumbnail, code, category, stock } = req.body;
  if (!title || !description || !price || !thumbnail || !code || !category || !stock) {
    res
      .status(400)
      .send("Missing information.");
  }
  let newProduct = {
    id: currentID++,
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock,
  };
  products.push(newProduct);
  res.status(200).json("Product created");
});

app.put("/api/products/:id", (req, res) => {
  let { id } = req.params;
  const { title, description, price, thumbnail, code, category, stock } = req.body;
  id = parseInt(id);
  let indexProduct = products.findIndex((product) => product.id === id);
  let newProduct = {
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock,
  };
  if (indexProduct !== -1) {
    products.splice(indexProduct, 1, newProduct);
    res.json({ mensaje: "Product updated", data: products[indexProduct] });
  } else {
    res.json({ mensaje: "Product not found" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  let { id } = req.params;
  let temporalProduct = {};
  id = parseInt(id);
  let indexProduct = usuarios.findIndex((product) => product.id === id);
  if (indexProduct !== -1) {
    temporalProduct = products[indexProduct];
    products.splice(indexProduct, 1);
    res.json({ mensaje: "Product deleted", data: temporalProduct });
  } else {
    res.json({ mensaje: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running in port: " + PORT);
});