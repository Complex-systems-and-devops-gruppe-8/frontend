import { BlackJackState , BlackJackAction } from './blackjackTypes'

export const blackjackReducer = (
  state: BlackJackState,
  action:BlackJackAction,
): BlackJackState => {
  const { type } = action

  switch (type) {
    case 'START_GAME':
      return {
        ...state,
        isGameStarted: true, 
        round: state.round + 1,
      }
    case 'PLACE_BET':
        return {
            ...state,
            placedBet: action.payload,
            isGameStarted: true,
            round: state.round + 1,
            
        }
     case 'DECREMENT_TIMER':
        return {
            ...state,
            roundTimer: state.roundTimer -1,
        }
    case 'START_ROUND':
        return {
            ...state,
            roundStarted: true,
        }
    case 'STOP_ROUND':
        return {
            ...state,
            roundStarted: false,
            roundTimer: 30,
        }
    case 'DEAL_CARD_TO_PLAYER':
        return {
            ...state,
            playerCards: [...state.playerCards, action.payload],
          
            hit: false,
        }
    case 'DEAL_CARD_TO_DEALER':
        return {
            ...state,
            dealerCards: [...state.dealerCards, action.payload],
          
        }
    case 'HIT':
        return {
            ...state,
            hit: true,
            roundTimer: 30,
            
        }
    case 'STAND':
        return {
            ...state,
            stand: true,
        }
    case 'UPDATE_PLAYER_SCORE':
        return {
            ...state,
            playerScore: action.payload,
        }
    case 'UPDATE_DEALER_SCORE':
        return {
            ...state,
            dealerScore: action.payload,
        }
    default:
      return state
  }
}