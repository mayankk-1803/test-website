import { ShoppingCart } from "lucide-react";
import { Suspense, useState } from "react";
import type { Product } from "../types";
import ProductShowcase3D from "./ProductShowcase3D";
import BuyNowForm from "./BuyNowForm";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const shapeMap = ["sphere", "box", "icosahedron"] as const;
const colorMap = ["#DC2626", "#EAB308", "#DC2626"] as const;
const emissiveMap = ["#990000", "#CA8A04", "#990000"] as const;

const ProductCard = ({ product }: ProductCardProps) => {
  const [showBuyForm, setShowBuyForm] = useState(false);

  const shapeIndex = Number(product._id?.slice(-1)) % 3;

  const shape = shapeMap[shapeIndex];
  const color = colorMap[shapeIndex];
  const emissiveColor = emissiveMap[shapeIndex];

  return (
    <>
      <div className="product-card">
        {/* FIXED IMAGE DISPLAY */}
        <div className="product-image-container">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <Suspense fallback={null}>
              <ProductShowcase3D
                color={color}
                emissiveColor={emissiveColor}
                shape={shape}
              />
            </Suspense>
          )}
        </div>

        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>

          <p className="product-description">{product.description}</p>

          <div className="product-footer">
            <span className="product-price">₹{product.price}</span>

            <button
              className="product-button"
              onClick={() => setShowBuyForm(true)}
            >
              <ShoppingCart size={18} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {showBuyForm && (
        <BuyNowForm product={product} onClose={() => setShowBuyForm(false)} />
      )}
    </>
  );
};

export default ProductCard;
