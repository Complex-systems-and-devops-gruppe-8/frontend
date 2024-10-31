import   { useEffect, useState,  useContext  } from 'react';
import '../../Styling/blackjack/ScoreBox.css'; // Import your CSS for styling
import { BlackJackContext } from '../../state/blackjackState/blackjackContext';
 


function ScoreBox () {
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useContext(BlackJackContext);

  // Show the popup when the component mounts
  useEffect(() => {
    if (state.hasWon || state.hasLost || state.isDraw) {
      setVisible(true);
    }
  

    
  }, [state.hasWon, state.hasLost,state.isDraw]);
  const handleClose = () => {
    setVisible(false);
    dispatch({ type: 'RESET_GAME' });
  };
  // Determine the message and style based on the result
  let message = '';
  let scoreStyle = '';

  if (state.hasWon) {
    message = `You Won: +${state.placedBet*2} Coins`;
    scoreStyle = 'scorebox-win';
  } else if (state.hasLost) {
    message = `You Lost: -${state.placedBet} Coins`;
    scoreStyle = 'scorebox-lose';
  } else if (state.isDraw) {
    message = `It's a Draw! you get your money back: +${state.placedBet}`;
    scoreStyle = 'scorebox-draw';
  }

  return (
    <div className={`scorebox ${visible ? 'show' : ''} ${scoreStyle}`}>
      <p>{message}</p>
      <button className="scorebox-button" onClick={handleClose}>Okay</button>
    </div>
  );
};

export default ScoreBox;