import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import ThreeDBackground from "./ThreeDBackground";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">

      {/* 3D Globe Background */}
      <Suspense fallback={null}>
        <ThreeDBackground />
      </Suspense>

      {/* Hero Content */}
      <div className="hero-container">
        <h1 className="hero-title">
          Prime Origin Exports
        </h1>

        <h3 className="hero-tagline">
          Committed to Quality. Accountable in Every Shipment.
        </h3>

        <button className="hero-cta">
          Shop Now
          <ArrowRight size={20} />
        </button>
      </div>

    </section>
  );
};

export default Hero;
