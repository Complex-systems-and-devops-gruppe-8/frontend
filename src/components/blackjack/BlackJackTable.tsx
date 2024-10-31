
import '../../styling//blackjack/BlackJack.css';
import CardComp from './Card';
import {  useContext } from 'react';
 
import Coin from './Coin';
import CoinPile from './CoinPile';
import { BlackJackContext } from '../../state/blackjackState/blackjackContext';
import ScoreBox from './ScoreBox';
 
 


function BlackJackTable()
{
    const { state, dispatch } = useContext(BlackJackContext);
   
    
    
     
    // Function to deal a random card
  
  const handlePlaceBet = () => {
    if(state.notPlacedBet > 0)
    {
    dispatch({ type: 'PLACE_BET', payload: state.notPlacedBet });
    }
  }
  const handleStand = () => {
    if(state.playerBust === false && state.playerStand === false)
    {
    dispatch({ type: 'PLAYER_STAND' });
    }
  }
  const handleHit = () => {
    if(state.playerBust === false &&   state.playerStand === false)
    {
    dispatch({ type: 'HIT' });
    }
  }
  const addCoin = (value: number) => {
    dispatch({ type: 'SET_NOT_PLACED_BET', payload: state.notPlacedBet + value });
 
  }
    const removeCoin = (value: number) => {
        if (state.notPlacedBet - value >= 0) {
          dispatch({ type: 'SET_NOT_PLACED_BET', payload: state.notPlacedBet - value });
        }
    }

    


  return (
    <>
    <section className="blackjack-table">
      <ScoreBox />
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
        <CoinPile totalBet={state.notPlacedBet} coins={state.coins} />
      
      </div>
      
    </section>
    <section className="bet-container">
    <div className="bet-controller">
    {!state.isGameStarted ? (
    <> 
    <button onClick={handlePlaceBet}>placedBet</button>
    <b className='bet-number'>Total Bet: {state.notPlacedBet}</b>
    <button onClick={() => removeCoin(state.notPlacedBet)}>Clear Bet</button>
    </>
    ) : 
    <div className='bet-info'> 
    <div className='bet-buttons'>
    <button onClick={handleStand}>Stand</button>
    <b className='bet-number'>Placed Bet: {state.placedBet}</b>
    <button onClick={handleHit}>Hit</button>
    </div>
    
    {state.roundStarted ? <div><b>Time Left: {state.roundTimer}</b></div> : null}
     
    </div>
    }
    </div>
    <div className='coin-container'>
 {/* Render coins dynamically based on the array */}
 {!state.isGameStarted ? (
    state.coins.map((coin) => (
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
     {!state.isGameStarted ? (
    <i>Left Click = add, Right Click = remove</i>
     ) : null}
 
    </section>
    
    </>


  );
}
export default BlackJackTable;