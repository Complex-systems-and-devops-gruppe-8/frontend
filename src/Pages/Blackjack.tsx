import {Link} from 'react-router-dom';
import  {useContext  } from 'react';
import Header from '../components/Header';
import BlackJackTable from '../components/blackjack/BlackJackTable';
import { AuthContext} from '../state/authState/authContext';
 
import { BlackJackProvider } from '../state/blackjackState/blackjackContext';

function BlackjackPage() {
  const { state } =  useContext(AuthContext);


  return (
    <> 
      <Header />
      {state.loginState.loggedIn&&state.authTokens.accessToken!==null&&state.authTokens.refreshToken!==null ? (
         <BlackJackProvider>
     
         <BlackJackTable />
          <Link to="/"> 
          <button>Go Back</button>
          </Link>
         </BlackJackProvider>
      ) : (
        <>
        <h1>Please login to play BlackJack</h1>
        <h2>You login at the top right corner</h2>
        </>
      )}
     
    </>
  );
 
}

export default BlackjackPage;