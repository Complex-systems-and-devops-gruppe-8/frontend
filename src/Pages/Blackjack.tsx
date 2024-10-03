import {Link} from 'react-router-dom';
import Header from '../components/Header';
import BlackJackTable from '../components/BlackJackTable';
 
function BlackjackPage() {
  return (
    <> 
      <Header />

 
      <BlackJackTable />
       <Link to="/"> 
       <button>Go Back</button>
       </Link>
  
    </>
  );
 
}

export default BlackjackPage;