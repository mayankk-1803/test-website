import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
import type { Product } from '../types';
import ProductShowcase3D from './ProductShowcase3D';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const shapeMap = ['sphere', 'box', 'icosahedron'] as const;
const colorMap = ['#DC2626', '#EAB308', '#DC2626'] as const;
const emissiveMap = ['#990000', '#CA8A04', '#990000'] as const;

const ProductCard = ({ product }: ProductCardProps) => {
  const shapeIndex = product.id % 3;
  const shape = shapeMap[shapeIndex] as 'sphere' | 'box' | 'icosahedron';
  const color = colorMap[shapeIndex];
  const emissiveColor = emissiveMap[shapeIndex];

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Suspense fallback={<img src={product.image} alt={product.name} className="product-image" />}>
          <ProductShowcase3D color={color} emissiveColor={emissiveColor} shape={shape} />
        </Suspense>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <button className="product-button">
            <ShoppingCart size={18} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
