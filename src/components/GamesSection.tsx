import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      default:
        break;
    }
    // Replace this with actual navigation or action
  };

  return (
    <section id="games" className="bg-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-purple-700 text-center mb-12">Games</h2>
        {/* Horizontal scrollable section */}
        <div className="flex space-x-6 overflow-x-auto py-4 scrollbar-hide whitespace-nowrap">
          <button
            onClick={() => handleGameClick('Blackjack')}
            className="min-w-[250px] bg-green-900 text-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4 cursor-pointer focus:outline-none"
          >
            <h3 className="text-2xl font-bold">Blackjack</h3>
            <p className="mt-4">Click to play Blackjack.</p>
          </button>
          <button
            onClick={() => handleGameClick('Poker')}
            className="min-w-[250px] bg-green-900 text-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4 cursor-pointer focus:outline-none"
          >
            <h3 className="text-2xl font-bold">Poker</h3>
            <p className="mt-4">Click to play Poker.</p>
          </button>
          <button
            onClick={() => handleGameClick('Coinflip')}
            className="min-w-[250px] bg-green-900 text-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4 cursor-pointer focus:outline-none"
          >
            <h3 className="text-2xl font-bold">CoinFlip</h3>
            <p className="mt-4">Click to play CoinFlip.</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
