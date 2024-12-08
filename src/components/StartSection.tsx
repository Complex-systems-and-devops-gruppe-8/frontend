import '../Styling/landingpage/StartSection.css';
import { useNavigate } from 'react-router-dom';

function StartSection() {
  const navigate = useNavigate(); // Move the hook here for proper use

  const handleRegister = () => {
    navigate('/register'); // Navigate to register page on button click
  };

  return (
    <section id="start" className="start-section">
      <h2 className="section-title">Feeling Lucky? Or Just Curious?</h2>
      <p className="funny-text">
        Why don't skeletons gamble? Because they don't have the guts! 
      </p>
      <p className="funny-text">
        Wanna hit the jackpot or just try your luck? Either way, let’s have some fun!
      </p>
      {/* Use a button instead of an anchor tag */}
      <button className="signup-btn" onClick={handleRegister}>
        Sign Up
      </button>
    </section>
  );
}

export default StartSection;
