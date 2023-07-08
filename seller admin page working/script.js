document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const addButton = document.getElementById("addButton");

  addButton.addEventListener("click", addProduct);

  // Fetch products from API on page load
  getProducts().then(displayProducts);

  async function getProducts() {
    try {
      const response = await fetch("https://crudcrud.com/api/b6780f50987c4e57a3b985d9edbb9a6b/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function addProduct() {
    const productName = document.getElementById("productName").value;
    const sellingPrice = document.getElementById("sellingPrice").value;
    const category = document.getElementById("category").value;

    if (productName && sellingPrice && category) {
      try {
        const response = await fetch("https://crudcrud.com/api/b6780f50987c4e57a3b985d9edbb9a6b/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productName,
            sellingPrice,
            category
          })
        });

        if (response.ok) {
          const product = await response.json();
          displayProduct(product);
        } else {
          console.error("Failed to add product:", response.status);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  }

  async function deleteProduct(productId) {
    try {
      const response = await fetch(`https://crudcrud.com/api/b6780f50987c4e57a3b985d9edbb9a6b/products/${productId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const productElement = document.getElementById(productId);
        productElement.remove();
      } else {
        console.error("Failed to delete product:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  function displayProducts(products) {
    productList.innerHTML = "";

    for (const product of products) {
      displayProduct(product);
    }
  }

  function displayProduct(product) {
    const productElement = document.createElement("div");
    productElement.id = product._id;
    productElement.classList.add("product");

    const nameElement = document.createElement("span");
    nameElement.textContent = product.productName;

    const priceElement = document.createElement("span");
    priceElement.textContent = product.sellingPrice;

    const categoryElement = document.createElement("span");
    categoryElement.textContent = product.category;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => deleteProduct(product._id));

    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(categoryElement);
    productElement.appendChild(deleteButton);

    productList.appendChild(productElement);
  }
});
