import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

interface Props {
  onAboutClick: () => void;
}

const Navbar = ({ onAboutClick }: Props) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onAboutClick();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">

        <div className="navbar-container">

          {/* Logo */}
          <div className="navbar-logo">
            <img src="/vlogo.png" alt="Prime Origin Exports Logo" className="navbar-logo-image" />
          </div>


          {/* Menu */}
          <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>

            <li>
              <a href="#home" onClick={()=>setIsOpen(false)}>
                Home
              </a>
            </li>

            <li>
              <a href="#" onClick={handleAboutClick}>
                About Us
              </a>
            </li>

            <li>
              <a href="#contact" onClick={()=>setIsOpen(false)}>
                Contact
              </a>
            </li>

          </ul>


          {/* Burger */}
          <div
            className="navbar-toggle"
            onClick={()=>setIsOpen(!isOpen)}
          >
            {isOpen
              ? <X size={28}/>
              : <Menu size={28}/>
            }
          </div>

        </div>

      </nav>


      {/* Overlay */}
      {isOpen && (
        <div
          className="navbar-overlay"
          onClick={()=>setIsOpen(false)}
        />
      )}

    </>
  );

};

export default Navbar;
