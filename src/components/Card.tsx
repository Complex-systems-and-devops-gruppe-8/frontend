// Card.tsx
import React from 'react';
import '../styling/BlackJack.css';

interface CardProps {
  type: 'Hearts' | 'Tiles' | 'Pikes' | 'Clovers';  
  value: string; // This could be something like "A", "2", "10", "K", etc.
}

//  Card component that takes CardProps as a prop
const Card: React.FC<CardProps> = ({ type, value }) => {
  // Step 3: Render the card based on the type and value
  return (
    <section className="card"  >
        <img className='card_img' src={`../../public/resources/black/${type}_${value}_black.png`} alt={`${value} of ${type}`} />
    </section>
  );
};
 
export default Card;