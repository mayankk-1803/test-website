import { useState } from "react";
import "./BuyNowForm.css";
import BurstConfetti from "./BurstConfetti";

interface EnquiryFormProps {
  product?: {
    _id?: string | null;
    name?: string;
  } | null;
  onClose: () => void;
}


const EnquiryForm = ({ product, onClose }: EnquiryFormProps) => {

  // Detect general enquiry safely
  const isGeneralEnquiry =
    !product ||
    !product._id ||
    product._id === "";

  const productName =
    isGeneralEnquiry
      ? "General Enquiry"
      : product.name || "Product Enquiry";


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBurst, setShowBurst] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,

            productId:
              isGeneralEnquiry
                ? null
                : product?._id,

            productName:
              productName

          })
        }
      );


      if (!res.ok)
        throw new Error("Failed");


      setSuccess(true);
      setShowBurst(true);


      setTimeout(() => {

        setShowBurst(false);
        onClose();

      }, 2500);

    }
    catch (err) {

      console.error(err);

      alert("Failed to send enquiry");

    }
    finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="buy-modal-overlay"
      onClick={onClose}
    >

      <div
        className="buy-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {success ? (

          <div className="success-container">

            {showBurst && <BurstConfetti />}

            <div className="success-content">

              <div className="success-check">✓</div>

              <h2>Enquiry Sent 🎉</h2>

              <p>We will contact you shortly.</p>

            </div>

          </div>

        ) : (

          <>

            <h2>
              {isGeneralEnquiry
                ? "General Enquiry"
                : `Enquiry for ${productName}`}
            </h2>


            <form onSubmit={handleSubmit}>

              <input
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                onChange={handleChange}
              />


              <div className="buy-actions">

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send Enquiry"}
                </button>


                <button
                  type="button"
                  className="cancel-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>

              </div>

            </form>

          </>

        )}

      </div>

    </div>

  );

};

export default EnquiryForm;
