import { ShoppingBag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <ShoppingBag size={32} />
          <span>TrendyShop</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
