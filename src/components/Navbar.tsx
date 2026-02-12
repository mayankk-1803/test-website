import { Menu, X } from "lucide-react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "./Navbar.css";

import EnquiryForm from "./EnquiryForm";

interface Props {
  onAboutClick: () => void;
}

const Navbar = ({ onAboutClick }: Props) => {

  const [isOpen, setIsOpen] = useState(false);

  const [showEnquiry, setShowEnquiry] =
    useState(false);


  const handleAboutClick = (
    e: React.MouseEvent
  ) => {

    e.preventDefault();

    onAboutClick();

    setIsOpen(false);

  };


  const handleEnquiryClick = (
    e: React.MouseEvent
  ) => {

    e.preventDefault();

    setShowEnquiry(true);

    setIsOpen(false);

  };


  return (
    <>

      <nav className="navbar">

        <div className="navbar-container">


          {/* LOGO */}
          <div className="navbar-logo">

            <img
              src="/vlogo.png"
              alt="Prime Origin Exports Logo"
              className="navbar-logo-image"
            />

          </div>


          {/* MENU */}
          <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>

            <li>
              <a
                href="#home"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>


            <li>
              <a
                href="#"
                onClick={handleAboutClick}
              >
                About Us
              </a>
            </li>


            {/* ENQUIRY */}
            <li>

              <a
                href="#"
                onClick={handleEnquiryClick}
                className="navbar-enquiry-btn"
              >
                Enquiry
              </a>

            </li>


            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>


          </ul>


          {/* BURGER */}
          <div
            className="navbar-toggle"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >

            {isOpen
              ? <X size={28}/>
              : <Menu size={28}/>}
          </div>


        </div>

      </nav>


      {/* MOBILE OVERLAY */}
      {isOpen && (

        <div
          className="navbar-overlay"
          onClick={() => setIsOpen(false)}
        />

      )}


      {/* GENERAL ENQUIRY POPUP */}
      {showEnquiry && (

        <EnquiryForm

          product={null}

          onClose={() =>
            setShowEnquiry(false)
          }

        />

      )}

    </>
  );

};

export default Navbar;
