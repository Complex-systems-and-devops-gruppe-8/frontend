import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import LandingPage from './Landingpage';
import PokerPage from './Pages/Poker';
import CoinFlipPage from './Pages/CoinFlip';
import BlackjackPage from './Pages/Blackjack';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coinflip" element={<CoinFlipPage />} />
        <Route path="/poker" element={<PokerPage />} />
        <Route path="/blackjack" element={<BlackjackPage />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
