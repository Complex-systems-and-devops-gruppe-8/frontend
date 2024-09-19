import React from 'react';

function Footer() {
  return (
    <footer className="bg-purple-900 text-purple-200 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2024 YourCompany. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li><a href="#privacy" className="hover:text-purple-400">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-purple-400">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
