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

  // const productIdToUpdate = 2;
  // const updatedProductInfo = {
  //   title: "Updated Title",
  //   description: "Updated Description",
  //   price: 993.99,
  //   thumbnail: "Updated Thumbnail",
  //   code: "UPDATED",
  //   stock: 500,
  // };

  // await productManager.updateProductById(productIdToUpdate, updatedProductInfo);

  // const updatedProducts = await productManager.getProducts();
  // console.log("Products:", updatedProducts);

  // const productIdToRemove = 2;
  // await productManager.removeProductById(productIdToRemove);

}
run();