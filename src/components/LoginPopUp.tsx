 
import "../Styling/LoginPopUp.css"

interface LoginPopUpProps {
    handleLogin: () => void;
    handleClose: () => void;
}

function LoginPopUp({ handleLogin, handleClose }: LoginPopUpProps) {

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
        handleLogin( ); // Calls handleLogin with username and password
      };
    return (
      <div className="overlay">
      
        <div className="login-popup">
          
          <form onSubmit={onSubmit}>
          <button className="close-btn" onClick={handleClose}>X</button>
            <label htmlFor="uname">Username:</label>
            <input className="input" type="text" id="uname" placeholder="Username" />
            
            <label htmlFor="pwd">Password:</label>
            <input className="input" type="password" id="pwd" placeholder="Password" />
  
            <button className="submitBtn" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default LoginPopUp;
