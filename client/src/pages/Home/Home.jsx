import { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../context/useAppContext';
import './Home.scss';

const ChatButton = lazy(() =>
  import('../../components/ChatButton').then((module) => ({
    default: module.ChatButton,
  }))
);

const ChatPortal = lazy(() =>
  import('../../components/ChatPortal').then((module) => ({
    default: module.ChatPortal,
  }))
);

const RoomContainer = lazy(() =>
  import('../../components/RoomContainer').then((module) => ({
    default: module.RoomContainer,
  }))
);

const ScoreBoard = lazy(() =>
  import('../../components/ScoreBoard').then((module) => ({
    default: module.ScoreBoard,
  }))
);

const TicTacToe = lazy(() =>
  import('../../components/TicTacToe').then((module) => ({
    default: module.TicTacToe,
  }))
);

const WinningMessage = lazy(() =>
  import('../../components/WinningMessage').then((module) => ({
    default: module.WinningMessage,
  }))
);

export function Home() {
  const { state } = useAppContext();
  const { draw, rival, user, winner } = state;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) navigate('/login');
  }, [navigate, user]);

  return user.username ? (
    <main className="Home--main-container">
      <RoomContainer />

      <Suspense fallback={<h3>Loading...</h3>}>
        {rival.id ? <ScoreBoard /> : null}

        {rival.id ? <TicTacToe /> : null}
        {winner || draw ? <WinningMessage /> : null}
      </Suspense>

      <ChatPortal />

      <ChatButton />
    </main>
  ) : null;
}
