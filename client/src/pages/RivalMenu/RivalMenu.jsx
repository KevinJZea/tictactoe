import { useAppContext } from '../../context/useAppContext';
import { RivalMenuCard } from '../../components/RivalMenuCard';
import './RivalMenu.scss';

const rivalMenuCards = [
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

export function RivalMenu() {
  const { state } = useAppContext();

  return (
    <main className="RivalMenu--container">
      <div className="RivalMenu--titles-container">
        <h1 className="RivalMenu--title">Welcome, {state.user.username}!</h1>
        <h2 className="RivalMenu--subtitle">Who do you want to play with?</h2>
      </div>
      <menu className="RivalMenu">
        {rivalMenuCards.map((rivalMenuCard) => (
          <li
            className="RivalMenu--item"
            key={rivalMenuCard.to}
          >
            <RivalMenuCard {...rivalMenuCard} />
          </li>
        ))}
      </menu>
    </main>
  );
}
