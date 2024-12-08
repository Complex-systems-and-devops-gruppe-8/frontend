import {
    createContext,
    useReducer,
    Dispatch,
    ReactNode,
    useEffect,
    useContext,
    
    
  } from 'react'
  import { BlackJackState, BlackJackAction, Card, BlackjackSimpleState,bjAction} from './blackjackTypes'
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
    blackJackGameResult: null,
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
    }, [authState.authEntity, authState.authTokens, state.blackjackEntity]);

    useEffect(() => {
      if(state.placedBet > 0 && !state.isGameStarted) {
        callStartGame();
      }
    }
    , [state.placedBet]);

    // USER_WIN,  DEALER_WIN, DRAW, ONGOING;
  useEffect(() => {
    if (state.blackJackGameResult === "USER_WIN") {
      dispatch({type: 'PLAYER_WINS'});
    }
    else if (state.blackJackGameResult === "DEALER_WIN") {
      dispatch({type: 'DEALER_WINS'});
    }
    else if (state.blackJackGameResult === "DRAW") {
      dispatch({type: 'DRAW'});
    }
  }
  , [state.blackJackGameResult]);

  useEffect(() => {
    const hit = state.hit;
    const playerStand = state.playerStand;
    dispatch({type: 'RESET_GAME_ACTION'})
    
    if (hit && state.blackJackGameResult === "ONGOING") {
     
        doAction(bjAction.HIT);
    }
    if (playerStand && state.blackJackGameResult === "ONGOING")
    {
   
      doAction(bjAction.STAND);
    }
}
, [state.hit, state.playerStand]);


useEffect(() => {
  dispatch({type: 'UPDATE_DEALER_SCORE', payload: calcScore(state.dealerCards) });

}, [state.dealerCards]);

useEffect(() => {
  
  dispatch({type: 'UPDATE_PLAYER_SCORE', payload: calcScore(state.playerCards) });
  
}, [state.playerCards]);
useEffect(() => {
  if(state.dealerScore > 21) {
    dispatch({type: 'DEALER_BUST'});
  }
}
, [state.dealerScore]);
useEffect(() => {
  if(state.playerScore > 21) {
    dispatch({type: 'PLAYER_BUST'});
  }
}
, [state.playerScore]);
    


  
   

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
     
        return score;
      }

    return (
        <BlackJackContext.Provider value={{ state, dispatch}}>
            {children}
        </BlackJackContext.Provider>
        );

  };