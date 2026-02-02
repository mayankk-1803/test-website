import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Products />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
