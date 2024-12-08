import   { useState, useEffect } from 'react';
import Coin from './Coin'; // Ensure this path is correct and points to your Coin component
import '../../Styling/blackjack/CoinPile.css';
interface Coins {
  color: string;
  value: number;
}

interface CoinPileProps {
  totalBet: number;
  coins: Coins[];
}

function CoinPile({ totalBet, coins }: CoinPileProps) {
  const [pile, setPile] = useState<Coins[]>([]);

  useEffect(() => {
    const createPile = () => {
      let remaining = totalBet;
      let index = coins.length - 1; // Start from the highest coin value
      const pile = [];

      while (remaining > 0 && index >= 0) {
        if (remaining >= coins[index].value) {
          remaining -= coins[index].value;
          pile.push(coins[index]); // Add the coin to the pile
        } else {
          index -= 1; // Move to the next smaller coin
        }
      }

      return pile;
    };

    // Update the pile whenever totalBet or coins change
    setPile(createPile());
  }, [totalBet, coins]);

  return (
    <div className="coin-pile">
      {pile.map((coin, index) => (
        <Coin key={index} color={coin.color} value={coin.value} size={0.5} />
      ))}
    </div>
  );
}

export default CoinPile;
