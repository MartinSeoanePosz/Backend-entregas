const socket = io();
console.log("hola mundo");

const addProductBtn = document.getById("addProductBtn");
const deleteProductBtn = document.delete("deleteProductBtn");

addProductBtn.addEventListener("click", () => {
  const title = document.getById("title").value;
  const description = document.getById("description").value;
  const price = document.getById("price").value;
  const thumbnail = document.getById("thumbnail").value;
  const code = document.getById("code").value;
  const category = document.getById("category").value;
  const stock = document.getById("stock").value;
  console.log(title, description, price, thumbnail, code, category, stock);
  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock,
  };

  socket.emit("addProduct", product);
  title.value = "";
  description.value = "";
  price.value = "";
  thumbnail.value = "";
  code.value = "";
  category.value = "";
  stock.value = "";
});

deleteProductBtn.addEventListener("click", () => {
  const id = document.getById("productId").value;
  console.log("Deleting product with ID:", id);
  socket.emit("deleteProductById", id, (result) => {
    console.log("Result from deleteProductById:", result);
    if (result && result.mensaje === "Product deleted") {
      alert("Producto eliminado");
      updateProductList(result.products);
    } else {
      alert("Error al eliminar el producto");
    }
  });
  document.getById("productId").value = "";
});

function getAll(products) {
  productListContainer.innerHTML = "";

  if (products && products.length > 0) {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `<p>${product.title}</p>`;
      productListContainer.appendChild(productElement);
    });
  } else {
    productListContainer.innerHTML = "<p>No products available.</p>";
  }
}
