import ProductManager from "./ProductManager.js";
async function run() {
  const productManager = new ProductManager();

  const product1 = {
    title: "Escuadra",
    description: "Escuadra de 30 cm.",
    price: 123.45,
    thumbnail:"Thumbnail1",
    code: "ESC",
    stock: 123,
  };
  const product2  = {
    title: "Calculadora",
    description: "Calculadora básica.",
    price: 234.56,
    thumbnail: "Thumbnail2",
    code: "CALC",
    stock: 234,
  };


  productManager.addProduct(product1);
  productManager.addProduct(product2);

  const products = await productManager.getProducts();
  console.log("Products:", products);

  const productId = 2;
  const product = await productManager.getProductById(productId);
  console.log(`Product by Id:${productId}`, product);

}
run();