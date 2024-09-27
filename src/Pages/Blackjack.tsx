import {Link} from 'react-router-dom';
 
function BlackjackPage() {
  return (
    <div className="min-h-screen flex flex-col">
       <h1 className="text-4xl text-center mt-10">Welcome to Balckjack</h1>
       <Link to="/"> 
       <button>Go Back</button>
       </Link>
    </div>
  );
}

export default BlackjackPage;