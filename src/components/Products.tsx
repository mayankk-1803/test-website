import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import type { Product } from "../types";

import "./Products.css";

const Products = () => {

  const ref = useScrollAnimation("show");

  const [products, setProducts] =
    useState<Product[]>([]);

  const fetchProducts = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      const data = await res.json();

      setProducts(data);

    } catch (error) {

      console.error("Error:", error);

    }

  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  return (

    <section id="products"
      className="products-section fade-up"
      ref={ref}
    >

      <div className="products-container">

        <h2 className="products-title">
          Our Products
        </h2>

        <div className="products-grid">

          {products.map((product, index) => (

            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: index   // needed for 3D shape logic
              }}
            />

          ))}

        </div>

      </div>

    </section>

  );

};

export default Products;
