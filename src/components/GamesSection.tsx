import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/landingpage/GamesSection.css';

const GamesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGameClick = (gameName: string): void => {
    switch (gameName) {
      case 'Blackjack':
        navigate('/blackjack');
        break;
      case 'Poker':
        navigate('/poker');
        break;
      case 'Coinflip':
        navigate('/coinflip');
        break;
      case 'Roulette':
        navigate('/roulette');
        break;
      default:
        break;
    }
  };

  const games = [
    { name: 'Blackjack', description: 'Click to play Blackjack.' },
    { name: 'Poker', description: 'Click to play Poker.' },
    { name: 'Coinflip', description: 'Click to play CoinFlip.' },
    { name: 'Roulette', description: 'Click to play Roulette.' },
    
  ];

  return (
    <section id="games">
      <div className="max-w-6xl mx-auto px-4">
        <h2>Games</h2>
        <div className="button-grid">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => handleGameClick(game.name)}
              className="game-item"
              aria-label={`Go to ${game.name}`}
            >
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
