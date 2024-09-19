import React, { useState } from "react";

const CoinFlip = () => {
  const [result, setResult] = useState<string | null>(null); // Define result as string or null
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    // Simulate the coin flip after 1 second
    setTimeout(() => {
      const outcomes = ["Heads", "Tails"];
      const randomResult = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult(randomResult);
      setFlipping(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Coin Flip</h1>
      <div style={{ fontSize: "100px" }}>
        {flipping ? "Flipping..." : result || "Ready?"}
      </div>
      <button
        onClick={flipCoin}
        disabled={flipping}
        style={{
          padding: "10px 20px",
          fontSize: "20px",
          cursor: flipping ? "not-allowed" : "pointer",
          backgroundColor: flipping ? "#ccc" : "#6200ea",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
    </div>
  );
};

export default CoinFlip;
