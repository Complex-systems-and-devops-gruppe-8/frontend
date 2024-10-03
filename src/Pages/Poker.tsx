 import {Link} from "react-router-dom";   
 
function PokerPage() {
  return (
    <div className="min-h-screen flex flex-col">
       <h1 className="text-4xl text-center mt-10">Welcome to Poker</h1>
       <Link to="/"> 
       <button>Go Back</button>
       </Link>
    </div>
  );
}

export default PokerPage;