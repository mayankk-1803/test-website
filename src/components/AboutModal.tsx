import "./AboutModal.css";

interface Props {
  onClose: () => void;
}

const AboutModal = ({ onClose }: Props) => {
  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-modal" onClick={(e) => e.stopPropagation()}>
        <h1>About Prime Origin Exports</h1>

        <p>
          We are an India-based global export company supplying a wide range of
          Indian-origin products to international markets. Built around strong
          sourcing networks, quality control systems, and export compliance, we
          operate as a reliable multi-product export partner for buyers across
          different industries. Our model allows us to meet diverse
          specifications, bulk volumes, and customized requirements with
          consistency and efficiency. Every shipment is handled with clear
          documentation, pre-dispatch quality checks, and transparent
          communication, ensuring smooth and dependable cross-border trade. Our
          focus is on long-term global partnerships, delivering reliability,
          scale, and trust in every transaction.
        </p>

        <button className="about-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
