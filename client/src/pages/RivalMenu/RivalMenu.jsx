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
  return (
    <main className="RivalMenu--container">
      <h1 className="RivalMenu--title">Who do you want to play with?</h1>
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
