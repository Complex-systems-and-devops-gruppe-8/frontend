import React from 'react';



function LandingPage() 





{
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-purple-700 text-white p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-3">
            <li><a href="#home" className="hover:text-purple-300">Home</a></li>
            <li><a href="#about" className="hover:text-purple-300">About</a></li>
            <li><a href="#features" className="hover:text-purple-300">Features</a></li>
            <li><a href="#contact" className="hover:text-purple-300">Contact</a></li>
          </ul>
        </nav>
        <a href="#start" className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 rounded-lg">Get Started</a>
      </header>

      <section id="home" className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Gambling.dk</h1>
        <a href="#start" className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg text-xl">
          Start Now
        </a>
      </section>

      <section id="games" className="bg-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-700 text-center mb-12">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4">
              <h3 className="text-2xl font-bold text-purple-700">Game 1</h3>
              <p className="mt-4 text-gray-700">Blacjack.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4">
              <h3 className="text-2xl font-bold text-purple-700">Game 2</h3>
              <p className="mt-4 text-gray-700">Poker.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg hover:border-purple-400 border-t-4">
              <h3 className="text-2xl font-bold text-purple-700">Game 3</h3>
              <p className="mt-4 text-gray-700">Roulette.</p>
            </div>
          </div>
        </div>
      </section>


    
      <section id="start" className="bg-purple-700 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <a href="#signup" className="bg-purple-500 hover:bg-purple-400 text-white py-3 px-6 rounded-lg text-xl">
          Sign Up Now
        </a>
      </section>

      <footer className="bg-purple-900 text-purple-200 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 YourCompany. All rights reserved.</p>
          <ul className="flex justify-center space-x-6 mt-4">
            <li><a href="#privacy" className="hover:text-purple-400">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-purple-400">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
