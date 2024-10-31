import {Link} from 'react-router-dom';
import Header from '../components/Header';
import BlackJackTable from '../components/blackjack/BlackJackTable';
 
import { BlackJackProvider } from '../state/blackjackState/blackjackContext';

function BlackjackPage() {
  return (
    <> 
      <Header />

      <BlackJackProvider>
     
      <BlackJackTable />
       <Link to="/"> 
       <button>Go Back</button>
       </Link>
      </BlackJackProvider>
    </>
  );
 
}

export default BlackjackPage;