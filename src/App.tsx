import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AboutModal from "./components/AboutModal";

import AdminLogin from "./admin/AdminLogin";
import AdminProtected from "./admin/AdminProtected";
import Chatbot from "./components/Chatbot";

function App() {

  const [showAbout, setShowAbout] = useState(false);

  /* =========================
     BACKEND WARMUP CALL
     ========================= */

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/warmup`)
      .then(() => console.log("Backend warmed"))
      .catch(() => console.log("Warmup failed"));

  }, []);


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

              <Chatbot />

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


        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={<AdminProtected />}
        />

      </Routes>


      {/* ABOUT MODAL */}
      {showAbout && (
        <AboutModal
          onClose={() => setShowAbout(false)}
        />
      )}

    </>
  );
}

export default App;
