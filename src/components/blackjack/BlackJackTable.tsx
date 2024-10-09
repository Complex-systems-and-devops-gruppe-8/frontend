
import '../../styling/BlackJack.css';
import Card from './Card';
import { useState } from 'react';
import {CardProps} from '../../types/blackjack';
import Coin from './Coin';
import CoinPile from './CoinPile';
 
 


function BlackJackTable()
{
    const [playerCards, setPlayerCards] = useState<CardProps[]>([]);
    const [dealerCards, setDealerCards] = useState<CardProps[]>([]);
    const [totalBet, setTotalBet] = useState<number>(0);
    // Function to deal a random card
  const dealCard = (): CardProps => {
    const ranks: CardProps['value'][] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits: CardProps['type'][] = ['Hearts' , 'Tiles' , 'Pikes' , 'Clovers'];

    // Generate a random card by selecting a random rank and suit
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];

   
    // Return a card object with rank and suit properties
    return { type: randomSuit, value: randomRank };
  };

  // Function to deal a card to the player
  const dealCardToPlayer = () => {
    const newCard = dealCard();
    setPlayerCards([...playerCards, newCard]);
  };

  // Function to deal a card to the dealer
  const dealCardToDealer = () => {
    const newCard = dealCard();
    setDealerCards([...dealerCards, newCard]);
  };
  const addCoin = (value: number) => {
    setTotalBet(totalBet + value);
  }
    const removeCoin = (value: number) => {
        if (totalBet - value >= 0) {
        setTotalBet(totalBet - value);
        }
    }

    const coins = [
        { color: '#eb4034', value: 5 },
        { color: '#3489eb', value: 10 },
        { color: '#34eb3d', value: 25 },
        { color: '#ebd334', value: 50 },
        { color: '#950cad', value: 100 },
      ];


  return (
    <>
    <section className="blackjack-table">
      {/* Dealer's section */}
      <div className="dealer">
        <h2>Dealer</h2>
        <div className="cards">
          {/* Render dealer's cards dynamically */}
          {dealerCards.map((card, index) => (
            <Card key={index} type={card.type} value={card.value} />
          ))}
        </div>

      </div>

      {/* Player's section */}
      <div className="player">
        <h2>Player</h2>
        <div className="cards">
          {/* Render player's cards dynamically */}
          {playerCards.map((card, index) => (
            <Card key={index} type={card.type} value={card.value} />
          ))}
        </div>
        <CoinPile totalBet={totalBet} coins={coins} />
      
      </div>
      
    </section>
    <section className="bet-container">
    <div className="bet-controller">
    <b>Total Bet: {totalBet}</b>
    </div>
    <div className='coin-container'>
 {/* Render coins dynamically based on the array */}
 {coins.map((coin ) => (
            <Coin
            
              color={coin.color}
              value={coin.value}
              onLeftClick={() => addCoin(coin.value)}
              onRightClick={() => removeCoin(coin.value)}
            />
          ))}
    
    </div>
    <i>Left Click = add, Right Click = remove</i>
    </section>
    <section className="test-controller">
    <button onClick={dealCardToDealer}>Deal Card to Dealer</button>
    <button onClick={dealCardToPlayer}>Deal Card to Player</button>
    </section>
    </>


  );
}
export default BlackJackTable;