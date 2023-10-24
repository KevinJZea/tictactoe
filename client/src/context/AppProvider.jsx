import { useReducer } from 'react';
import { AppContext } from './appContext';
import { ACTIONS, ERRORS, PLAYERS } from '../utils/constants';

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
  cells: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' },
  selectedCells: {
    [PLAYERS.CROSS]: [],
    [PLAYERS.CIRCLE]: [],
  },
  darkTheme: true,
  draw: false,
  error: {},
  isChatOpen: false,
  messages: [],
  rival: {
    points: 0,
  },
  room: {},
  turn: PLAYERS.CROSS,
  user: {
    mark: PLAYERS.CROSS,
    points: 0,
  },
  winner: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CELL_SELECTED:
      return {
        ...state,
        cells: { ...state.cells, [action.payload.index]: action.payload.mark },
        selectedCells: {
          ...state.selectedCells,
          [action.payload.mark]: [
            ...state.selectedCells[action.payload.mark],
            parseInt(action.payload.index),
          ],
        },
      };

    case ACTIONS.CLEAN_ERROR:
      return { ...state, error: { ...initialState.error } };

    case ACTIONS.CLOSE_CHAT:
      return { ...state, isChatOpen: false };

    case ACTIONS.CREATE_SESSION:
      return { ...state, sessionId: action.payload };

    case ACTIONS.DRAW:
      return { ...state, draw: true };

    case ACTIONS.INCREASE_USER_SCORE:
      return {
        ...state,
        user: { ...state.user, points: state.user.points + 1 },
      };

    case ACTIONS.INCREASE_RIVAL_SCORE:
      return {
        ...state,
        rival: { ...state.rival, points: state.rival.points + 1 },
      };

    case ACTIONS.NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case ACTIONS.RESTART_GAME:
      return {
        ...state,
        cells: { ...initialState.cells },
        draw: false,
        selectedCells: { ...initialState.selectedCells },
        winner: initialState.winner,
      };

    case ACTIONS.ROOM_NOT_FOUND:
      return {
        ...state,
        error: { type: ERRORS.ROOM_NOT_FOUND },
      };

    case ACTIONS.ROOM_FULL:
      return {
        ...state,
        error: { type: ERRORS.ROOM_FULL },
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

    case ACTIONS.UPDATE_RIVAL:
      return { ...state, rival: { ...state.rival, ...action.payload } };

    case ACTIONS.UPDATE_ROOM:
      return { ...state, room: { ...state.room, ...action.payload } };

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
