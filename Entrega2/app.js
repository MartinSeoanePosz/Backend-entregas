import ProductManager from "./ProductManager.js";

async function init() {
    const productManager = new ProductManager();

    const product1 = {
        title: "Producto 1",
        description: "Descripcion 1",
        price: 100,
        thumbnail: "Thumbnail 1",
        code: "Code 1",
        stock: 10
    }
    const product2 = {
        title: "Producto 2",
        description: "Descripcion 2",
        price: 200,
        thumbnail: "Thumbnail 2",
        code: "Code 2",
        stock: 20
    }
    const product3 = {
        title: "Producto 3",
        description: "Descripcion 3",
        price: 300,
        thumbnail: "Thumbnail 3",
        code: "Code 3",
        stock: 30
    }
    productManager.addProduct(product1.title, product1.description, product1.price, product1.thumbnail, product1.code, product1.stock);
    productManager.addProduct(product2.title, product2.description, product2.price, product2.thumbnail, product2.code, product2.stock);
    // productManager.addProduct(product3.title, product3.description, product3.price, product3.thumbnail, product3.code, product3.stock);

    // const updatedData = {
    //     title: "Updated Product Title",
    //     price: 150,
    //     stock: 25
    // };
    // productManager.updateProduct(2, updatedData);

    // Borrar 1 producto basado en su ID
    // productManager.deleteProduct(3);

    console.log(productManager.getProducts());
    console.log(productManager.getProductById(1));


}
init();