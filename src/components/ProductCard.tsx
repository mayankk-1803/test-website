// import { ShoppingCart, Mail } from "lucide-react";
// import { Suspense, useState } from "react";
// import type { Product } from "../types";

// import ProductShowcase3D from "./ProductShowcase3D";
// import BuyNowForm from "./BuyNowForm";
// import EnquiryForm from "./EnquiryForm";

// import "./ProductCard.css";

// interface ProductCardProps {
//   product: Product;
// }

// const shapeMap = ["sphere", "box", "icosahedron"] as const;
// const colorMap = ["#DC2626", "#EAB308", "#DC2626"] as const;
// const emissiveMap = ["#990000", "#CA8A04", "#990000"] as const;

// const ProductCard = ({ product }: ProductCardProps) => {

//   const [showBuyForm, setShowBuyForm] = useState(false);
//   const [showEnquiryForm, setShowEnquiryForm] = useState(false);

//   // generate consistent shape based on id
//   const shapeIndex =
//     Number(product._id?.slice(-1)) % 3 || 0;

//   const shape = shapeMap[shapeIndex];
//   const color = colorMap[shapeIndex];
//   const emissiveColor = emissiveMap[shapeIndex];


//   return (
//     <>
//       <div className="product-card glass">

//         <div className="product-image-container">

//           {product.image ? (

//             <img
//               src={product.image}
//               alt={product.name}
//               className="product-image"
//             />

//           ) : (

//             <Suspense fallback={null}>

//               <ProductShowcase3D
//                 color={color}
//                 emissiveColor={emissiveColor}
//                 shape={shape}
//               />

//             </Suspense>

//           )}

//         </div>


//         <div className="product-content">

//           <h3 className="product-name">
//             {product.name}
//           </h3>

//           <p className="product-description">
//             {product.description}
//           </p>


//           <div className="product-footer">

//             <button
//               className="product-button buy-btn"
//               onClick={() => setShowBuyForm(true)}
//             >
//               <ShoppingCart size={18}/>
//               Buy Now
//             </button>


//             <button
//               className="product-button enquiry-btn"
//               onClick={() => setShowEnquiryForm(true)}
//             >
//               <Mail size={18}/>
//               Enquiry
//             </button>

//           </div>

//         </div>

//       </div>


//       {showBuyForm && (
//         <BuyNowForm
//           product={product}
//           onClose={() => setShowBuyForm(false)}
//         />
//       )}

//       {showEnquiryForm && (
//         <EnquiryForm
//           product={product}
//           onClose={() => setShowEnquiryForm(false)}
//         />
//       )}

//     </>
//   );
// };

// export default ProductCard;

import { ShoppingCart, Mail } from "lucide-react";
import { Suspense, useState } from "react";
import type { Product } from "../types";

import ProductShowcase3D from "./ProductShowcase3D";
import BuyNowForm from "./BuyNowForm";
import EnquiryForm from "./EnquiryForm";

import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const shapeMap = ["sphere", "box", "icosahedron"] as const;
const colorMap = ["#DC2626", "#EAB308", "#DC2626"] as const;
const emissiveMap = ["#990000", "#CA8A04", "#990000"] as const;

const ProductCard = ({ product }: ProductCardProps) => {

  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const [titleExpanded, setTitleExpanded] = useState(false);
  const TITLE_LIMIT = 80;

  const isTitleLong = product.name.length > TITLE_LIMIT;
  const shortTitle = product.name.substring(0, TITLE_LIMIT);

  const [descExpanded, setDescExpanded] = useState(false);
  const WORD_LIMIT = 180;

  const words = product.description
    ? product.description.split(" ")
    : [];

  const isDescLong = words.length > WORD_LIMIT;
  const shortDesc = words.slice(0, WORD_LIMIT).join(" ");

  const shapeIndex =
    Number(product._id?.slice(-1)) % 3 || 0;

  const shape = shapeMap[shapeIndex];
  const color = colorMap[shapeIndex];
  const emissiveColor = emissiveMap[shapeIndex];

  return (
    <>
      <div className="product-card glass">

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

          {/* TITLE */}
          <div className="product-title-container">

            <h3 className="product-name">
              {titleExpanded || !isTitleLong
                ? product.name
                : shortTitle + "..."}
            </h3>

            {isTitleLong && (
              <span
                className="read-more-btn"
                onClick={() =>
                  setTitleExpanded(!titleExpanded)
                }
              >
                {titleExpanded
                  ? "Read Less"
                  : "Read More...."}
              </span>
            )}

          </div>


          {/* DESCRIPTION */}
          <div className="product-description-container">

            <p className="product-description">

              {descExpanded || !isDescLong
                ? product.description
                : shortDesc + "..."}

            </p>

            {isDescLong && (
              <span
                className="read-more-btn"
                onClick={() =>
                  setDescExpanded(!descExpanded)
                }
              >
                {descExpanded
                  ? "Read Less"
                  : "Read More"}
              </span>
            )}

          </div>


          {/* BUTTONS */}
          <div className="product-footer">

            <button
              className="product-button buy-btn"
              onClick={() =>
                setShowBuyForm(true)
              }
            >
              <ShoppingCart size={18}/>
              Buy Now
            </button>

            <button
              className="product-button enquiry-btn"
              onClick={() =>
                setShowEnquiryForm(true)
              }
            >
              <Mail size={18}/>
              Enquiry
            </button>

          </div>

        </div>

      </div>


      {showBuyForm && (
        <BuyNowForm
          product={product}
          onClose={() =>
            setShowBuyForm(false)
          }
        />
      )}

      {showEnquiryForm && (
        <EnquiryForm
          product={product}
          onClose={() =>
            setShowEnquiryForm(false)
          }
        />
      )}

    </>
  );
};

export default ProductCard;
