import { useState } from "react";
import "./App.css";

const sampleProducts = [
  {
    id: 1,
    name: "Apple",
    category: "Fruits",
    price: 1.0,
    inStock: true,
    inCart: false,
  },
  {
    id: 2,
    name: "Milk",
    category: "Dairy",
    price: 2.5,
    inStock: false,
    inCart: false,
  },
  {
    id: 3,
    name: "Banana",
    category: "Fruits",
    price: 0.5,
    inStock: true,
    inCart: false,
  },
  {
    id: 4,
    name: "Cheese",
    category: "Dairy",
    price: 3.0,
    inStock: true,
    inCart: false,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToCart = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId && !product.inCart
          ? { ...product, inCart: true }
          : product,
      ),
    );
  };

  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();
  const cartItems = products.filter((product) => product.inCart);

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>🛒 Shopping App</h1>
      <p>
        Welcome! Your task is to implement filtering, cart management, and dark
        mode.
      </p>

      <div className="filters-section">
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>

      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="products-list">
        <h2>Available Products</h2>
        {filteredProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`card ${!product.inStock ? "outOfStock" : ""}`}
            >
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Status: {product.inStock ? "In Stock" : "Out of Stock"}</p>
              {!product.inCart && (
                <button
                  data-testid={`product-${product.id}`}
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="shopping-cart">
          <h2>Shopping Cart</h2>
          {cartItems.map((product) => (
            <p key={product.id}>{product.name} is in your cart.</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
