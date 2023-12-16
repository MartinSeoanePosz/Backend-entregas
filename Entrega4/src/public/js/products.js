const socket = io();
console.log("hola mundo");

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
//   console.log(title, description, price, thumbnail, code, category, stock);
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
    const id = document.getElementById("productId").value;
    console.log(id);
    socket.emit("deleteProduct", id);
    id.value = "";
    alert("producto eliminado");
  });
  socket.on("updateProducts", (products) => {
    updateProductList(products);

});
function updateProductList(products) {
    productListContainer.innerHTML = "";
  
    if (products.length === 0) {
      productListContainer.innerHTML = "<p>No products available.</p>";
    } else {
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `<p>${product.title}</p>`;
        productListContainer.appendChild(productElement);
      });
    }
}