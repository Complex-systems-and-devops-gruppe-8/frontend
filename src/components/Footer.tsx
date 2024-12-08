import '../Styling/landingpage/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; 2024 Gambling.dk. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
          <li><a href="#terms" className="footer-link">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
