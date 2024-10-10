  // Define the Card type
 

  
export type Card = {
    rank: '0' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    suit: 'Hearts' | 'Tiles' | 'Pikes' | 'Clovers'| 'Blank';
};
type Coins = {
    color: string;
    value: number;
  };
  // Define props that Card component will receive
 

export type BlackJackState = {
    dealerCards: Card[]
    playerCards: Card[]
    placedBet: number
    coins: Coins[]
    message: string
    isGameStarted: boolean
    roundTimer: number
     
    testMode: boolean
    round: number
    roundStarted: boolean
    hit: boolean
    stand: boolean
    dealerScore: number
    playerScore: number
    playerBust: boolean
    dealerBust: boolean
    hasWon: boolean
    hasLost: boolean
    timeBetweenCardsDelt: number
    timestamp: number


   
  
  }
  export type BlackJackAction =
  | { type: 'START_GAME'; payload: { error: String } }
  |  { type: 'PLACE_BET'; payload: number }
  | { type: 'DECREMENT_TIMER' }
  | { type: 'STOP_ROUND' }
  | { type: 'DEAL_CARD_TO_PLAYER'; payload: Card }
  | { type: 'DEAL_CARD_TO_DEALER'; payload: Card  }
  | { type: 'START_ROUND' }
    | { type: 'HIT' }
    | { type: 'STAND' }
    | { type: 'UPDATE_PLAYER_SCORE'; payload: number }
    | { type: 'UPDATE_DEALER_SCORE'; payload: number }
    | { type: 'PLAYER_BUST' }
    | { type: 'DEALER_BUST' }
    | { type: 'PLAYER_WINS' }
    | {type: 'SET_DEALER_CARDS'; payload: Card[]}
    | {type: 'DECREMENT_TIME_BETWEEN_CARDS'}
 