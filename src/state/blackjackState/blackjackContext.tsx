import {
    createContext,
    useReducer,
    Dispatch,
    ReactNode,
    useEffect,
    
    
  } from 'react'
  import { BlackJackState, BlackJackAction, Card } from './blackjackTypes'
  import { blackjackReducer } from './blackjackReducer'
   

  // Define the initial state
  const initialState: BlackJackState = {
    dealerCards: [],
    playerCards: [],
    placedBet: 0,
    coins: [],
    message: '',
    isGameStarted: false,
    roundTimer: 30,
    testMode: true,
    
    round: 0,
    roundStarted: false,
    hit: false,
    stand: false,
    dealerScore: 0,
    playerScore: 0,
  }
  
  interface BlackJackProviderProps {
    children: ReactNode
  }
  
  export const BlackJackContext = createContext<{
    state: BlackJackState
    dispatch: Dispatch<BlackJackAction>
 
  }>({
    state: initialState,
    dispatch: () => null, // Placeholder function
     
  })
  
  export const BlackJackProvider = ({ children }: BlackJackProviderProps ) => {
    const [state, dispatch] = useReducer(blackjackReducer, initialState)

    useEffect(() => {
        if (state.roundStarted) {
          const timer = setInterval(() => {
            // Only decrement if the timer is greater than 0
            if (state.roundTimer > 0) {
                 
              dispatch({ type: 'DECREMENT_TIMER' });
            } else {
              clearInterval(timer); // Stop the timer when it reaches 0
              dispatch({ type: 'STOP_ROUND' }); // Optional: dispatch an action to handle the end of the game
            }
          }, 1000);
    
          return () => clearInterval(timer); // Cleanup on unmount
        }
      }, [state.roundStarted,state.roundTimer]); 

    useEffect(() => {
        if (state.round === 1)
        {
            dealCards();
        }
    
    }, [state.round]);
    useEffect(() => {
        if (state.hit) {
            hit();
        }
    }, [state.hit]);
    useEffect(() => {
        if (state.playerCards.length !== 0 ) {
            console.log("should update player score");
           dispatch({type: 'UPDATE_PLAYER_SCORE', payload: calcScore(state.playerCards) });  
        }

    }, [state.playerCards]);
    useEffect(() => {
        if (state.dealerCards.length !== 0 ) {
            dispatch({type: 'UPDATE_DEALER_SCORE', payload: calcScore(state.dealerCards) });
      
        }

    }, [state.dealerCards]);

    const getRandomCard = (): Card  => {
        const ranks: Card ['rank'][] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits: Card ['suit'][] = ['Hearts' , 'Tiles' , 'Pikes' , 'Clovers'];
    
        // Generate a random card by selecting a random rank and suit
        const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    
       
        // Return a card object with rank and suit properties
        return { suit: randomSuit, rank: randomRank };
      };
  
   
    const dealCards = () => {
    if (state.testMode) {

     
        dispatch({ type: 'DEAL_CARD_TO_PLAYER', payload: getRandomCard () });
        dispatch({ type: 'DEAL_CARD_TO_PLAYER', payload: getRandomCard () });
        dispatch({ type: 'DEAL_CARD_TO_DEALER', payload: getRandomCard () });
        dispatch({ type: 'DEAL_CARD_TO_DEALER', payload: getRandomCard () });
    }
    else {
        // Make a request to the server to deal cards
    
    } 

    dispatch({ type: 'START_ROUND' });

    };
    const hit = () => {
        if (state.testMode) {
            const newCard = getRandomCard();
            dispatch({ type: 'DEAL_CARD_TO_PLAYER', payload: newCard });
            
        }
        else {
            // Make a request to the server to deal cards
        }
    }
    const calcScore = (cards: Card[]): number => {
        let score = 0;
        let aces = 0;
    
        cards.forEach((card) => {
          if (card.rank === 'A') {
            aces++;
          } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
            score += 10;
          } else {
            score += parseInt(card.rank);
          }
        });
    
        // Handle Aces
        score += aces; // Count Aces as 1 first
        for (let i = 0; i < aces; i++) {
            // For each Ace, check if we can add an additional 10 (making it 11 instead of 1)
            if (score + 10 <= 21) {
                score += 10; // Treat this Ace as 11
            }
        }
    
        return score;
      }

    return (
        <BlackJackContext.Provider value={{ state, dispatch}}>
            {children}
        </BlackJackContext.Provider>
        );

  };