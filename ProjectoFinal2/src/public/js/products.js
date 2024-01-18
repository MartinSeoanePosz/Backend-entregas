const socket = io();

if (window.location.pathname.includes("/realtime")) {
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
  document.getElementById("productId").value = "";
});
}
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


if (window.location.pathname.includes("/products")){

  function changeLimit(newLimit) {
    window.location.href = `/products?page={{page}}&limit=${newLimit}&sortBy={{sortBy}}&sortOrder={{sortOrder}}&category={{category}}`;
  }
  
  function changeSortBy(newSortBy) {
    window.location.href = `/products?page={{page}}&limit={{limit}}&sortBy=${newSortBy}&sortOrder={{sortOrder}}&category={{category}}`;
  }
  
  function changeSortOrder(newSortOrder) {
    window.location.href = `/products?page={{page}}&limit={{limit}}&sortBy={{sortBy}}&sortOrder=${newSortOrder}&category={{category}}`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-button');
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedCategory = button.getAttribute('data-category');
        updateURLWithCategory(selectedCategory);
      });
    });
  
    function updateURLWithCategory(category) {
      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set('category', category);
      window.location.href = currentURL.href;
    }
  });

  document.addEventListener("DOMContentLoaded", async () => {
    const { value: email } = await Swal.fire({
      title: "Enter your email",
      input: "email",
      showCancelButton: true,
    });

    // Email for cart
    let userEmailAddress = email || null;

    // Add to cart butons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", async () => {
        const productId = button.dataset.productId;

        if (!userEmailAddress) {
          return; 
        }
        const response = await fetch(`/api/add-to-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmailAddress }),
        });

        if (response.ok) {
          console.log("Product added to cart!");
        } else {
          console.error("Failed to add product to cart");
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", async () => {
    // ... existing code ...
  
    // Get the "Finish Shopping" button
    const finishShoppingButton = document.getElementById("finishShoppingButton");
  
    // Add a click event listener to the "Finish Shopping" button
    finishShoppingButton.addEventListener("click", async () => {
      try {
        // Make an AJAX request to fetch the current cart ID
        const response = await fetch("/api/current-cart-id");
        if (response.ok) {
          const { cartId } = await response.json();
  
          // Redirect the user to the /cart/:cid page using the obtained cart ID
          window.location.href = `/cart/${cartId}`;
        } else {
          console.error("Failed to fetch current cart ID");
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

}
