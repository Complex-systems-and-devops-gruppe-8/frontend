
import '../../styling//blackjack/BlackJack.css';
import CardComp from './Card';
import { useState, useContext } from 'react';
 
import Coin from './Coin';
import CoinPile from './CoinPile';
import { BlackJackContext } from '../../state/blackjackState/blackjackContext';
 
 


function BlackJackTable()
{
    const { state, dispatch } = useContext(BlackJackContext);
   
    
    
    const [totalBet, setTotalBet] = useState<number>(0);
    // Function to deal a random card
  
  const handlePlaceBet = () => {
    dispatch({ type: 'PLACE_BET', payload: totalBet });
  }
  const handleStand = () => {
    if(state.playerBust === false && state.stand === false)
    {
    dispatch({ type: 'STAND' });
    }
  }
  const handleHit = () => {
    if(state.playerBust === false &&   state.stand === false)
    {
    dispatch({ type: 'HIT' });
    }
  }
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
        {state.dealerBust ? <h1 className='busted-text'>Busted!</h1> : null}
        <h2>Dealer</h2>
        <b>Score: {state.dealerScore}</b>
        <div className="cards">
          {/* Render dealer's cards dynamically */}
          {state.dealerCards.map((card, index) => (
            <CardComp key={index} suit={card.suit} rank={card.rank} />
          ))}
        </div>

      </div>

      {/* Player's section */}
      <div className="player">
        {state.playerBust ? <h1 className='busted-text'>Busted!</h1> : null}
       
        <h2>Player</h2>
        <b>Score: {state.playerScore}</b>
        <div className="cards">
          {/* Render player's cards dynamically */}
          {state.playerCards.map((card, index) => (
            <CardComp key={index} suit={card.suit} rank={card.rank} />
          ))}
        </div>
        <CoinPile totalBet={totalBet} coins={coins} />
      
      </div>
      
    </section>
    <section className="bet-container">
    <div className="bet-controller">
    {!state.isGameStarted ? (
    <> 
    <button onClick={handlePlaceBet}>placedBet</button>
    <b>Total Bet: {totalBet}</b>
    <button onClick={() => setTotalBet(0)}>Clear Bet</button>
    </>
    ) : 
    <> 
    <button onClick={handleStand}>Stand</button>
    <b>Placed Bet: {state.placedBet}</b>
    <button onClick={handleHit}>Hit</button>
    {state.roundStarted ? <b>Time Left: {state.roundTimer}</b> : null}
    </>
    }
    </div>
    <div className='coin-container'>
 {/* Render coins dynamically based on the array */}
 {!state.isGameStarted ? (
    coins.map((coin) => (
      <Coin
        key={coin.value} // Always add a unique key when rendering lists
        color={coin.color}
        value={coin.value}
        onLeftClick={() => addCoin(coin.value)}
        onRightClick={() => removeCoin(coin.value)}
      />
    ))
  ) : null} {/* Render nothing if the game has started */}
    </div>
    <i>Left Click = add, Right Click = remove</i>
    </section>
    <section className="test-controller">
    <button >Deal Card to Dealer</button>
    <button >Deal Card to Player</button>
    </section>
    </>


  );
}
export default BlackJackTable;