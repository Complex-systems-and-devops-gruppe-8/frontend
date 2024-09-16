import React from 'react';

function Header() {
  return (
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
  );
}

export default Header;