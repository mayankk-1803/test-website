import { useEffect, useState } from "react";
import { testimonials } from "../data";
import "./Testimonials.css";

type Testimonial = {
  name: string;
  review: string;
  rating: number;
};

const Testimonials = () => {

  const [allTestimonials, setAllTestimonials] =
    useState<Testimonial[]>([]);

  const loadReviews = async () => {

  try {

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews`
    );

    const dbReviews = await res.json();

    setAllTestimonials([
      ...testimonials,
      ...dbReviews
    ]);

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

  loadReviews();

  window.addEventListener(
    "reviewAdded",
    loadReviews
  );

  return () =>
    window.removeEventListener(
      "reviewAdded",
      loadReviews
    );

}, []);


  const renderStars = (rating: number): string => {
    return "★".repeat(rating);
  };

  return (
    <section className="testimonials-section">

      <div className="marquee">

        <div className="marquee-content">

          {[...allTestimonials, ...allTestimonials]
          .map((testimonial, index)=>(
            
            <div key={index} className="testimonial-card">

              <div className="testimonial-stars">
                {renderStars(testimonial.rating)}
              </div>

              <p>{testimonial.review}</p>

              <p>— {testimonial.name}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;
