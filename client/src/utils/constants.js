export const ACTIONS = {
  CELL_SELECTED: 'cell-selected',
  CLEAN_DRAW: 'clean-draw',
  CLEAN_ERROR: 'clean-error',
  CLEAN_GAME: 'clean-game',
  CLOSE_CHAT: 'close-chat',
  CREATE_SESSION: 'create-session',
  DRAW: 'draw',
  INCREASE_USER_SCORE: 'increase-user-score',
  INCREASE_RIVAL_SCORE: 'increase-rival-score',
  NEW_MESSAGE: 'new-message',
  NO_NEW_MESSAGES: 'new-messages',
  RESTART_GAME: 'restart-game',
  RIVAL_ABANDONED: 'rival-abandoned',
  ROOM_FULL: 'room-full',
  ROOM_NOT_FOUND: 'room-not-found',
  SWITCH_TURNS: 'switch-turns',
  TOGGLE_DARK_THEME: 'toggle-dark-theme',
  TOGGLE_CHAT: 'toggle-chat',
  UPDATE_RIVAL: 'update-rival',
  UPDATE_ROOM: 'update-room',
  UPDATE_USER: 'update-user',
  UPDATE_WINNER: 'update-winner',
};

export const ERRORS = {
  ROOM_FULL: 'room-full',
  ROOM_NOT_FOUND: 'room-not-found',
};

export const PLAYERS = {
  CROSS: 'cross',
  CIRCLE: 'circle',
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const ICONS = {
  MessageCircle: 'message-circle',
  Moon: 'moon',
  Send: 'send',
  Sun: 'sun',
  X: 'x',
};

export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  LOGIN: '/login',
  NOT_FOUND: '*',
};

export const GAME_ROUTES = {
  CPU: 'cpu',
  FRIEND: 'friend',
  RANDOM: 'random',
};
