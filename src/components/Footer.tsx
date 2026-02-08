import { useState } from "react";
import { Facebook, Instagram, Twitter, Mail, Star } from "lucide-react";

import BurstConfetti from "./BurstConfetti";
import "../components/BuyNowForm.css";
import "./Footer.css";

interface Props {
  onAboutClick: () => void;
}

const Footer = ({ onAboutClick }: Props) => {
  const currentYear = new Date().getFullYear();

  const [showModal, setShowModal] = useState(false);

  const [rating, setRating] = useState(0);

  const [name, setName] = useState("");

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [showBurst, setShowBurst] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !review.trim() || rating === 0) return;

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          review,
          rating,
        }),
      });

      if (res.ok) {
        setName("");
        setReview("");
        setRating(0);

        setShowModal(false);

        setSuccess(true);
        setShowBurst(true);

        window.dispatchEvent(new Event("reviewAdded"));

        setTimeout(() => {
          setSuccess(false);
          setShowBurst(false);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-content">
            {/* Brand */}
            <div className="footer-section">
              <h3 className="footer-brand">TrendyShop</h3>

              <p className="footer-description">
                Your trusted destination for premium quality products
              </p>
            </div>

            {/* Links */}
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>

              <ul className="footer-links">
                <li>
                  <a href="#home">Home</a>
                </li>

                <li>
                  <button className="footer-about-btn" onClick={onAboutClick}>
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="footer-section">
              <h4 className="footer-heading">Connect With Us</h4>

              <div className="footer-socials">
                <a href="#">
                  <Facebook size={24} />
                </a>

                <a href="#">
                  <Instagram size={24} />
                </a>

                <a href="#">
                  <Twitter size={24} />
                </a>

                <a href="mailto:primeoriginexports@gmail.com">
                  <Mail size={24} />
                </a>
              </div>

              <button className="review-btn" onClick={() => setShowModal(true)}>
                Give Review
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {currentYear} TrendyShop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Review Modal */}
      {showModal && (
        <div className="review-modal" onClick={() => setShowModal(false)}>
          <div className="review-box" onClick={(e) => e.stopPropagation()}>
            <h3>Give Review</h3>

            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  onClick={() => setRating(star)}
                  fill={star <= rating ? "gold" : "none"}
                  stroke="gold"
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <button
              className="review-submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              className="review-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="buy-modal-overlay">
          <div className="buy-modal">
            <div className="success-container">
              {showBurst && <BurstConfetti />}

              <div className="success-content">
                <div className="success-check">✓</div>

                <h2>Review Submitted 🎉</h2>

                <p>Thank you for your feedback!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
