import { ProductManager } from "./ProductManager.js";

let myFirstStore = new ProductManager("./products.json");

//title, description, price, thumbnail, code, stock
await myFirstStore.addProduct(
    "Monitor",
    "Monitor 24 pulgadas",
    12000,
    "Thumbnail1",
    4123,
    10
);
await myFirstStore.addProduct(
    "Mouse",
    "Mouse inalambrico",
    1000,
    "Thumbnail2",
    4124,
    20
);
await myFirstStore.addProduct(
    "Teclado",
    "Teclado inalambrico",
    1000,
    "Thumbnail3",
    4125,
    40
);
await myFirstStore.addProduct(
    "Parlantes",
    "Parlantes 2.1",
    1000,
    "Thumbnail4",
    4126,
    50
);
await myFirstStore.addProduct(
    "Auriculares",
    "Auriculares con microfono",
    1000,
    "Thumbnail5",
    4127,
    60
);

