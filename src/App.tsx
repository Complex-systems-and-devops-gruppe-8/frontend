import React from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import MainContent from './MainContent.tsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;