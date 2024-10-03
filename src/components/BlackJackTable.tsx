
import '../styling/BlackJack.css';
import Card from './Card';
 


function BlackJackTable()
{
    return (
        <section className="blackjack-table">
      
        <div className="dealer">
            <h2>Dealer</h2>
            <div className="cards">
            <Card type="Hearts" value="A" />
            <Card type="Clovers" value="2" />
            </div>
        </div>
      
        <div className="player">
        <h2>Player</h2>
            <div className="cards">
            <Card type="Hearts" value="A" />
            <Card type="Clovers" value="2" />
            </div>
         
        </div> 
        
       
       
        </section>

    );
}
export default BlackJackTable;