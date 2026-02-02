import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import ThreeDBackground from './ThreeDBackground';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <Suspense fallback={null}>
        <ThreeDBackground />
      </Suspense>
      <div className="hero-container">
        <h1 className="hero-title">TrendyShop</h1>
        <p className="hero-tagline">Discover Premium Quality Products That Elevate Your Lifestyle</p>
        <button className="hero-cta">
          Shop Now
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
