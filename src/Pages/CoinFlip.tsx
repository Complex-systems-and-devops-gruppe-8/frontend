import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styling/CoinFlip.css';
import '../Styling/landingpage/Header.css';

function CoinFlipPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails'>('heads'); // Initial result set to heads
  const [prevResult, setPrevResult] = useState<'heads' | 'tails'>('heads'); // Track previous result

  const handleFlipCoin = () => {
    setPrevResult(result);

    const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
    setResult(newResult);

    setIsFlipping(true);

    setTimeout(() => {
      setPrevResult(newResult);
    }, 500);

    setTimeout(() => {
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <div className="coin-flip-container">
      <Header />
      <h1 className="coin-flip-title">Welcome to CoinFlip</h1>

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
