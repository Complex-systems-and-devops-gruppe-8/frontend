import {
    createContext,
    useReducer,
    Dispatch,
    ReactNode,
    useEffect,
    useContext,
    
    
  } from 'react'
  import { BlackJackState, BlackJackAction, Card, BlackjackSimpleState,bjAction } from './blackjackTypes'
  import { blackjackReducer } from './blackjackReducer'
  import { AuthContext } from '../authState/authContext'
  import { sirenClient } from '../../api/sirenClient';
   

  // Define the initial state
  const initialState: BlackJackState = {
    dealerCards: [],
    playerCards: [],
    placedBet: 0,
    coins:   [
      { color: '#eb4034', value: 5 },
      { color: '#3489eb', value: 10 },
      { color: '#34eb3d', value: 25 },
      { color: '#ebd334', value: 50 },
      { color: '#950cad', value: 100 },
    ],
    message: '',
    isGameStarted: false,
    roundTimer: 30,
    testMode: false,
    notPlacedBet: 0,
    blackjackEntity: null,
    gameID: null,
    round: 0,
    roundStarted: false,
    hit: false,
    playerStand: false,
    dealerStand: false,
    dealerScore: 0,
    playerScore: 0,
    playerBust: false,
    dealerBust: false,
    hasWon: false,
    hasLost: false,
    isDraw: false,
    timeBetweenCardsDelt: 3,
    timestamp: 0,
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
    const { state: authState  } = useContext(AuthContext);

    useEffect(() => {
      if(authState.authEntity && authState.authTokens.accessToken && !state.blackjackEntity)  {
      const init = async () => {
        try {
          // Find the game link from the rootEntity
          const gameLink = authState?.rootEntity?.links?.find((link: any) => link.rel.includes('game'));
          if (!gameLink) {
            console.error('Game link not found');
            return;
          }
         
          // Fetch and parse the game entity
          const game = await sirenClient.followAndParse(gameLink.href);
          if (!game?.links) {
            console.error('Game entity has no links');
            return;
          }
          
          // Find the blackjack link
          const blackLink = game.links.find((link: any) => link.rel.includes('blackjack'));
          if (!blackLink) {
            console.error('Blackjack link not found');
            return;
          }
    
          // Fetch and parse the blackjack entity
          const blackjack = await sirenClient.followAndParse(blackLink.href);
        
          if (!blackjack) {
            console.error('Failed to fetch blackjack entity');
            return;
          }
    
          // Dispatch the blackjack entity to the state
          dispatch({ type: 'SET_BLACKJACK_ENTITY', payload: blackjack });
        } catch (error) {
          console.error('Failed to initialize:', error);
        }
      };
      
      // Invoke the initialization function
      init();
    }
    }, [authState.authEntity, authState.authTokens]);

    useEffect(() => {
      if(state.placedBet > 0 && !state.isGameStarted) {
        callStartGame();
      }
    }
    , [state.placedBet]);


  useEffect(() => {
    if (state.hit) {
        doAction(bjAction.HIT);
    }
    if (state.playerStand)
    {
      doAction(bjAction.STAND);
    }
}
, [state.hit, state.playerStand]);


useEffect(() => {
  dispatch({type: 'UPDATE_DEALER_SCORE', payload: calcScore(state.dealerCards) });
}, [state.dealerCards]);

useEffect(() => {
  console.log('player cards', state.playerCards)
  dispatch({type: 'UPDATE_PLAYER_SCORE', payload: calcScore(state.playerCards) });
}, [state.playerCards]);

/* 
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
        if (state.timeBetweenCardsDelt > 0) {
          const timer = setInterval(() => {
            dispatch({ type: 'DECREMENT_TIME_BETWEEN_CARDS' });
          }, 1000);
      
          return () => clearInterval(timer); // Cleanup to avoid multiple intervals
        }
      }, [state.timeBetweenCardsDelt]);

    useEffect(() => {
        if (state.round === 1)
        {
            dealCards();
        }
    
    }, [state.round]); 
   
    



    useEffect(() => {
        if (state.hit) {
            hitPlayer();
        }
    }, [state.hit]);
    useEffect(() => {
        if (state.playerCards.length !== 0 ) {
       
           dispatch({type: 'UPDATE_PLAYER_SCORE', payload: calcScore(state.playerCards) });  
        }

    }, [state.playerCards]);
    useEffect(() => {
        if (state.dealerCards.length !== 0 ) {
            dispatch({type: 'UPDATE_DEALER_SCORE', payload: calcScore(state.dealerCards) });
      
        }

    }, [state.dealerCards]);
    useEffect(() => {
      if(state.playerScore > 21) {
     
        dispatch({type: 'PLAYER_BUST'});
        
      }
    }
    ,[state.playerScore]);
    useEffect(() => {
      if(state.dealerScore > 21) {
      
        dispatch({type: 'DEALER_BUST'});
      }
      else if(state.dealerScore >= 17) {
        dispatch({type: 'DEALER_STAND'});
      }
    }, [state.dealerScore]);
    useEffect(() => {
      console.log(state.timeBetweenCardsDelt)
      if(state.playerStand && state.dealerScore < 17 && state.timeBetweenCardsDelt === 0) {
        console.log('hit dealer')
        hitDealer();
      
        dispatch({ type: 'RESET_TIME_BETWEEN_CARDS'});
      }
    }, [state.playerStand,state.playerBust,state.dealerCards,state.timeBetweenCardsDelt]);
    useEffect(() => {
      if(state.playerStand && state.dealerStand){
        if(state.dealerBust == true && state.playerBust ==false || state.playerScore > state.dealerScore && state.playerBust == false && state.dealerBust == false) {
        dispatch({type: 'PLAYER_WINS'});
        }
        else if(state.playerBust == true || state.playerScore < state.dealerScore && state.dealerBust == false) {
          dispatch({type: 'DEALER_WINS'});
        }
        else if(state.playerScore == state.dealerScore && state.dealerBust == false && state.playerBust == false) {
          dispatch({type: 'DRAW'});
        }
      }
    }, [state.playerStand,state.dealerStand]);
     */
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
        dispatch({ type: 'DEAL_CARD_TO_DEALER', payload: {suit: 'Blank', rank: '0'} });
        dispatch({ type: 'START_ROUND' });
    }
    else {
        // Make a request to the server to deal cards
       
    
    } 

    

    };

    const callStartGame = async () => {
        if (state.blackjackEntity) {
       
          try {
            const startGameAction = state.blackjackEntity.actions.find(
              (action: any) => action.name === 'start-game'
            );
    
            if (!startGameAction) {
              console.error('Start game action not found');
              return;
            }
            const betAmount = state.notPlacedBet;
            if (!betAmount) {
              console.error('No bet placed');
              return;
            }
            const response = await sirenClient.submitAndParse<BlackjackSimpleState>(startGameAction, {betAmount: betAmount});
             
            
            
         

            dispatch({ type: 'INIT_GAME', payload: response  });

          } catch (error) {
            console.error('Failed to start game:', error);
          }
        }
      };



      const doAction = async (action: bjAction) => {
        if (state.blackjackEntity) {
          try {
            const actionToPerform = state.blackjackEntity.actions.find(
              (act: any) => act.name === 'do-action'
            );
            
            if (!actionToPerform) {
              console.error('Action not found');
              return;
            }
      
            // Ensure `id` is replaced in the `href`
            const gameId = state.gameID; // Assuming `id` is stored in `gameEntity`
            if (!gameId) {
              console.error('Game ID not found in state');
              return;
            }
            
             

            // Perform the action
            const response = await sirenClient.submitAndParse<BlackjackSimpleState>(actionToPerform,  
              { choice: action },gameId.toString()
            );
      
            // Dispatch updated game state
            dispatch({ type: 'UPDATE_GAME_STATE', payload: response });
          } catch (error) {
            console.error('Failed to perform action:', error);
          }
        }
      };

    const flipCard = () => {
      // Find and remove the blank card
      const updatedDealerCards = state.dealerCards.filter(card => !(card.suit === 'Blank' && card.rank === '0'));
  
      // Dispatch the updated dealer cards (without the blank card)
      dispatch({
        type: 'SET_DEALER_CARDS',
        payload: updatedDealerCards,
      });
    };
    const hitDealer = () => {
      if (state.testMode) {
        const newCard = getRandomCard();
  
        // Check if there is a blank card in the dealer's hand
        if (state.dealerCards.some(card => card.suit === 'Blank' && card.rank === '0')) {
          // Remove blank card and dispatch updated deck
          flipCard();
        }
  
        // Dispatch the new card to the dealer's deck
        dispatch({ type: 'DEAL_CARD_TO_DEALER', payload: newCard });
      } else {
        // Make a request to the server to deal cards
      }
    };

    const calcScore = (cards: Card[]): number => {
        let score = 0;
        let aces = 0;
    
        cards.forEach((card) => {
          if (card.rank === 'A') {
            aces++;
          } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
            score += 10;
          
          } 
          else {
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
        console.log('score', score)
        return score;
      }

    return (
        <BlackJackContext.Provider value={{ state, dispatch}}>
            {children}
        </BlackJackContext.Provider>
        );

  };