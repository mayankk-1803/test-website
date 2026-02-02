import { Star } from 'lucide-react';
import { testimonials } from '../data';
import './Testimonials.css';

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} size={20} fill="#EAB308" color="#EAB308" />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-review">{testimonial.review}</p>
              <p className="testimonial-name">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
