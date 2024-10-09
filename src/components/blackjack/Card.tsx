// Card.tsx
import React from 'react';
import '../../styling/blackjack/Card.css';
import {Card} from '../../state/blackjackState/blackjackTypes';



//  Card component that takes CardProps as a prop
const CardComp: React.FC<Card> = ({suit,rank}) => {
  // Step 3: Render the card based on the type and value
  return (
    <section className="card"  >
        <img className='card_img' src={`../../public/resources/black/${suit}_${rank}_black.png`} alt={`${rank} of ${suit}`} />
    </section>
  );
};
 
export default CardComp;