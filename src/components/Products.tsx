import { products } from '../data';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  return (
    <section className="products-section">
      <div className="products-container">
        <h2 className="products-title">Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
