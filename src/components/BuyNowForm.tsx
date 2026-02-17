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

            {/*Confetti BEHIND confirmation */}
            {showBurst && <BurstConfetti />}

            {/*Confirmation content ABOVE confetti */}
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


              <div className="buy-actions">

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : `Confirm Order`}
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
