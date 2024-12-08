import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styling/CoinFlip.css';
import '../Styling/Header.css';

function CoinFlipPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails'>('heads'); // Initial result set to heads
  const [prevResult, setPrevResult] = useState<'heads' | 'tails'>('heads'); // Track previous result

  const handleFlipCoin = () => {
    setPrevResult(result); // Set the previous result to the current result

    // Determine the new result randomly
    const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
    setResult(newResult);

    // Start the flip animation
    setIsFlipping(true);

    // Set a timeout to switch the background-image at the midpoint (500ms)
    setTimeout(() => {
      setPrevResult(newResult); // This triggers the mid-flip image change
    }, 500);

    // Reset the flipping state after the animation duration
    setTimeout(() => {
      setIsFlipping(false);
    }, 1000); // Match the duration of the CSS animation
  };

  return (
    <div className="coin-flip-container">
      <Header />
      <h1 className="coin-flip-title">Welcome to CoinFlip</h1>

      {/* Single image element for flipping */}
      <div className={`coin-image-container ${isFlipping ? 'flip' : ''} ${prevResult}`}>
        <div className="coin-image"></div>
      </div>

      <div className="button-container">
        <Link to="/">
          <button className="button">
            Go Back
          </button>
        </Link>
        <button className="button" onClick={handleFlipCoin}>
          Flip Coin
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CoinFlipPage;
