const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");
addProductBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;
  // console.log(title, description, price, thumbnail, code, category, stock);
  const product = {
    title: title,
    description: description,
    price: price,
    thumbnail: thumbnail,
    code: code,
    category: category,
    stock: stock,
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
  document.getElementById("productId").value = "";
});

function updateProductList(products) {
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