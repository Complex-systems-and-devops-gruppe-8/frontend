 
import { BlackJackState , BlackJackAction } from './blackjackTypes'

export const blackjackReducer = (
  state: BlackJackState,
  action:BlackJackAction,
): BlackJackState => {
  const { type } = action

  switch (type) {
 
            case 'PLAYER_BUST':
        return {
            ...state,
            playerBust: true,
           
        }
    case 'DEALER_BUST':
        return {
            ...state,
            dealerBust: true,
           
        }
            case 'DRAW':
                return {
                    ...state,
                    isDraw: true,
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
                blackJackGameResult: action.payload.gameResult ,
            }
        case 'UPDATE_GAME_STATE':
            return {
                ...state,
                 playerCards: action.payload.playerHand.cards,
                dealerCards: action.payload.dealerHand.cards,
                gameID: action.payload.id,
                placedBet: action.payload.betAmount,
                isGameStarted: true,
                blackJackGameResult: action.payload.gameResult ,
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
            case 'RESET_GAME_ACTION':
                return {
                    ...state,
                    hit: false,
                    playerStand: false,
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
            
    default:
      return state
  }
}