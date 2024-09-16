import React from 'react';

function MainContent() {
  return (
    <main>
      <section id="home" className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Gambling.dk</h1>
        <a href="#start" className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg text-xl">
          Start Now
        </a>
      </section>

      <section id="games" className="bg-purple-50 py-20">
        {/* Content for games section */}
      </section>
    </main>
  );
}

export default MainContent;