import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import type { Product } from "../types";
import "./Products.css";

const Products = () => {

  const ref = useScrollAnimation("show");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchProducts = async () => {

    try {

      setLoading(true);
      setError(null);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data.data || data);

    } catch (err) {

      console.error("Fetch products error:", err);

      setError("Unable to load products. Please try again.");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchProducts();

  }, []);


  return (

    <section
      id="products"
      className="products-section fade-up"
      ref={ref}
    >

      <div className="products-container">

        <h2 className="products-title">
          Our Products
        </h2>


        {/* Skeleton Loading */}
        {loading && (

          <div className="products-grid">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="product-skeleton"
              />

            ))}

          </div>

        )}


        {/* Error State */}
        {!loading && error && (

          <div className="products-error">

            <p>{error}</p>

            <button
              className="retry-button"
              onClick={fetchProducts}
            >
              Retry
            </button>

          </div>

        )}


        {/* Products */}
        {!loading && !error && (

          <div className="products-grid">

            {products.length === 0 ? (

              <p className="no-products">
                No products available.
              </p>

            ) : (

              products.map((product, index) => (

                <ProductCard
                  key={product._id}
                  product={{
                    ...product,
                    id: index
                  }}
                />

              ))

            )}

          </div>

        )}

      </div>

    </section>

  );

};

export default Products;
