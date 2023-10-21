import { useReducer } from 'react';
import { AppContext } from './appContext';
import { ACTIONS, PLAYERS } from '../utils/constants';

/**
 * Initial state for the application's state management.
 *
 * @typedef {Object} InitialState
 * @property {boolean} darkTheme - A boolean representing whether the current theme is dark.
 * @property {boolean} isChatOpen - A boolean indicating whether the chat portal is open or closed.
 * @property {Array} messages - An array containing chat messages.
 * @property {string} messages[].senderId - The unique identifier of the message sender.
 * @property {string} messages[].content - The content of the chat message.
 * @property {string} sessionId - A string representing the session ID.
 * @property {Object} user - An object representing user-related information.
 * @property {string} user.id - The user's unique identifier.
 * @property {string} user.username - The user's username.
 *
 * @example
 * const initialState = {
 *   darkTheme: true,
 *   isChatOpen: false,
 *   messages: [],
 *   sessionId: '',
 *   user: {
 *     id: '12345',
 *     username: 'John Doe',
 *   },
 * };
 */

const initialState = {
  selectedCells: {
    [PLAYERS.CROSS]: [],
    [PLAYERS.CIRCLE]: [],
  },
  darkTheme: true,
  draw: false,
  isChatOpen: false,
  messages: [],
  sessionId: '',
  turn: PLAYERS.CROSS,
  user: {},
  winner: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CELL_SELECTED:
      return {
        ...state,
        selectedCells: {
          ...state.selectedCells,
          [action.payload.mark]: [
            ...state.selectedCells[action.payload.mark],
            action.payload.index,
          ],
        },
      };

    case ACTIONS.CLOSE_CHAT:
      return { ...state, isChatOpen: false };

    case ACTIONS.CREATE_SESSION:
      return { ...state, sessionId: action.payload };

    case ACTIONS.DRAW:
      return { ...state, draw: true };

    case ACTIONS.NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case ACTIONS.RESTART_GAME:
      return {
        ...state,
        draw: false,
        turn: PLAYERS.CROSS,
        selectedCells: { ...initialState.selectedCells },
        winner: initialState.winner,
      };

    case ACTIONS.SWITCH_TURNS:
      return {
        ...state,
        turn: state.turn === PLAYERS.CROSS ? PLAYERS.CIRCLE : PLAYERS.CROSS,
      };

    case ACTIONS.TOGGLE_CHAT:
      return { ...state, isChatOpen: !state.isChatOpen };

    case ACTIONS.TOGGLE_DARK_THEME:
      return { ...state, darkTheme: !state.darkTheme };

    case ACTIONS.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };

    case ACTIONS.UPDATE_WINNER:
      return { ...state, winner: action.payload };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
