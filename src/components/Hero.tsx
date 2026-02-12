// import { Suspense, useRef } from "react";
// import "./Hero.css";
// import HeroGlobe from "./HeroGlobe";

// const Hero = () => {

//   const heroRef = useRef<HTMLDivElement | null>(null);

//   return (

//     <section className="hero" ref={heroRef} id="home">

//       {/* Globe Background */}
//       <div className="three-d-container">
//         <Suspense fallback={null}>
//           <HeroGlobe />
//         </Suspense>
//       </div>


//       {/* Hero Content */}
//       <div className="hero-container">

//         <h1 className="hero-title">
//           Prime Origin Exports
//         </h1>

//         <h2 className="hero-tagline">
//           Committed to Quality. Accountable in Every Shipment.
//         </h2>

//         <button className="hero-cta" >
//           Shop Now →
//         </button>

//       </div>

//     </section>

//   );
// };

// export default Hero;


import { motion } from "framer-motion";
import HeroGlobe from "./HeroGlobe";
import "./Hero.css";

const Hero = () => {

  return (

    <section className="hero">

      {/* Globe Background */}
      <motion.div
        className="three-d-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
      >
        <HeroGlobe />
      </motion.div>



      {/* Hero Content */}
      <motion.div
        className="hero-container"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >


        {/* Title */}
        <motion.h1
          className="hero-title"
          variants={{
            hidden: {
              opacity: 0,
              y: 40
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
        >
          Prime Origin Exports
        </motion.h1>



        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          variants={{
            hidden: {
              opacity: 0,
              y: 30
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
        >
          Committed to Quality. Accountable in Every Shipment.
        </motion.p>



        {/* CTA Button */}
       <motion.button
  className="hero-cta"
  onClick={() => {
    const section = document.getElementById("products");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }}
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }}
  whileHover={{
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(220,38,38,0.4)"
  }}
  whileTap={{ scale: 0.96 }}
>
  Shop Now →
</motion.button>




      </motion.div>


    </section>

  );

};

export default Hero;
