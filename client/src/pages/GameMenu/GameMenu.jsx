import { useAppContext } from '../../context/useAppContext';
import { GameMenuCard } from '../../components/GameMenuCard';
import './GameMenu.scss';

const gameMenuCards = [
  {
    to: '/game/cpu',
    title: 'CPU',
    description: 'Play against the CPU.',
    disabled: true,
  },
  {
    to: '/game/random',
    title: 'Random User',
    description:
      'Join a random room and the next user selecting this option will be sent to that exact room.',
    disabled: true,
  },
  {
    to: '/game/friend',
    title: 'Friend',
    description: 'Create a new room or join an existing one with your friend.',
  },
];

export function GameMenu() {
  const { state } = useAppContext();

  return (
    <main className="GameMenu--container">
      <div className="GameMenu--titles-container">
        <h1 className="GameMenu--title">Welcome, {state.user.username}!</h1>
        <h2 className="GameMenu--subtitle">Who do you want to play with?</h2>
      </div>
      <menu className="GameMenu">
        {gameMenuCards.map((gameMenuCard) => (
          <li
            className="GameMenu--item"
            key={gameMenuCard.to}
          >
            <GameMenuCard {...gameMenuCard} />
          </li>
        ))}
      </menu>
    </main>
  );
}
