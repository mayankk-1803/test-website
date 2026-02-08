import { useState } from "react";
import "./BuyNowForm.css";
import BurstConfetti from "./BurstConfetti";

interface BuyNowFormProps {
  product: any;
  onClose: () => void;
}

const BuyNowForm = ({ product, onClose }: BuyNowFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    paymentMethod: "COD",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productId: product._id,
          productName: product.name,
          price: product.price,
        }),
      });

      setSuccess(true);
      setShowBurst(true);

      setTimeout(() => {
        setShowBurst(false);
        onClose();
      }, 2500);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-modal-overlay" onClick={onClose}>
      <div
        className="buy-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="success-container">

            {/* 🎊 Confetti BEHIND confirmation */}
            {showBurst && <BurstConfetti />}

            {/* ✅ Confirmation content ABOVE confetti */}
            <div className="success-content">
              <div className="success-check">✓</div>

              <h2>Order Placed 🎉</h2>

              <p>We’ll contact you shortly.</p>
            </div>

          </div>
        ) : (
          <>
            <h2>Buy {product.name}</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                required
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
              />

              {/* Quantity Stepper */}
              <div className="quantity-stepper">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      quantity: Math.max(1, p.quantity - 1),
                    }))
                  }
                >
                  −
                </button>

                <span>{formData.quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      quantity: p.quantity + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>

              {/* Payment Method */}
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="COD">
                  Cash on Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Card
                </option>
              </select>

              <div className="buy-actions">

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : `Confirm Order (₹${
                        product.price *
                        formData.quantity
                      })`}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>

              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyNowForm;
