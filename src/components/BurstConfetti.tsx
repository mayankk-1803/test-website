import "./BurstConfetti.css";

const EMOJIS = ["🎉", "🎊", "✨", "💥"];

const BurstConfetti = () => {
  return (
    <div className="burst-overlay">
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = Math.random() * 360;
        const distance = Math.random() * 300 + 100;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        return (
          <span
            key={i}
            className="burst-emoji"
            style={
              {
                "--angle": `${Math.random() * 360}deg`,
                "--distance": `${Math.random() * 200 + 100}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              } as React.CSSProperties
            }
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default BurstConfetti;
