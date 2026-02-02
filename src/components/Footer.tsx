import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">TrendyShop</h3>
            <p className="footer-description">
              Your trusted destination for premium quality products
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect With Us</h4>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TrendyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
