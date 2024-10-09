// Define the Card type
type Card_Type = {
    rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    suit: 'Hearts' | 'Tiles' | 'Pikes' | 'Clovers';
  };

  // Define props that Card component will receive
export interface CardProps {
  type: Card_Type['suit']; // The suit of the card
  value: Card_Type['rank']; // The rank of the card
}