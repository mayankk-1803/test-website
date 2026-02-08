import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AboutModal from "./components/AboutModal";

import AdminLogin from "./admin/AdminLogin";
import AdminProtected from "./admin/AdminProtected";

function App() {

  // Global About modal state
  const [showAbout, setShowAbout] = useState(false);

  return (

    <>

      <Routes>

        {/* MAIN WEBSITE */}
        <Route
          path="/"
          element={
            <>
              <Navbar
                onAboutClick={() => setShowAbout(true)}
              />

              <Hero />

              <Products />

              <Testimonials />

              <Footer
                onAboutClick={() => setShowAbout(true)}
              />
            </>
          }
        />


        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* PROTECTED ADMIN PANEL */}
        <Route
          path="/admin"
          element={<AdminProtected />}
        />

      </Routes>


      {/* GLOBAL ABOUT MODAL */}
      {showAbout && (

        <AboutModal
          onClose={() => setShowAbout(false)}
        />

      )}

    </>

  );

}

export default App;
