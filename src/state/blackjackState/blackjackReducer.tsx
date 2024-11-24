import { ac } from 'vitest/dist/chunks/reporters.D7Jzd9GS.js'
import { BlackJackState , BlackJackAction } from './blackjackTypes'

export const blackjackReducer = (
  state: BlackJackState,
  action:BlackJackAction,
): BlackJackState => {
  const { type } = action

  switch (type) {

    /*
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
    
    case 'DEALER_STAND':
        return {
            ...state,
            dealerStand: true,
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
    case 'PLAYER_BUST':
        return {
            ...state,
            playerBust: true,
            playerStand: true,
        }
    case 'DEALER_BUST':
        return {
            ...state,
            dealerBust: true,
            dealerStand: true,
        }
    case 'PLAYER_WINS':
        return {
            ...state,
            hasWon: true,
        }
    case 'DEALER_WINS':
        return {
            ...state,
            hasLost: true,
        }
    case 'SET_DEALER_CARDS':
        return {
            ...state,
            dealerCards: action.payload,
        }
    case 'DECREMENT_TIME_BETWEEN_CARDS':
        return {
            ...state,
            timeBetweenCardsDelt: state.timeBetweenCardsDelt - 1,
        }
    case 'RESET_TIME_BETWEEN_CARDS':
        return {
            ...state,
            timeBetweenCardsDelt: 2,
        }
    case 'RESET_GAME':
        return {
            
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
            testMode: true,
            notPlacedBet: 0,
            round: 0,
            roundStarted: false,
            hit: false,
            playerStand: false,
            blackjackEntity: null,
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
        case 'DRAW':
            return {
                ...state,
                isDraw: true,
            }
                */


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


            case 'PLACE_BET':
        return {
            ...state,
            placedBet: action.payload,
            
        }
        case 'SET_NOT_PLACED_BET':
            return {
                ...state,
                notPlacedBet: action.payload,
            }
       
            case 'SET_BLACKJACK_ENTITY':
            return {
                ...state,
                blackjackEntity: action.payload,
            }
            
        case 'INIT_GAME':
            return {
                ...state,
                 playerCards: action.payload.playerHand.cards,
                    dealerCards: action.payload.dealerHand.cards,
                    gameID: action.payload.id,
                placedBet: action.payload.betAmount,
                isGameStarted: true,
            }
        case 'UPDATE_GAME_STATE':
            return {
                ...state,
                 playerCards: action.payload.playerHand.cards,
                dealerCards: action.payload.dealerHand.cards,
                gameID: action.payload.id,
                placedBet: action.payload.betAmount,
                isGameStarted: true,
            }
            case 'HIT':
                return {
                    ...state,
                    hit: true,
                   
                    
                }
            case 'PLAYER_STAND':
                return {
                    ...state,
                    playerStand: true,
                   
                }
    default:
      return state
  }
}