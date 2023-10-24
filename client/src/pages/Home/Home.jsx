import { Suspense, lazy } from 'react';
import { ChatButton } from '../../components/ChatButton';
import { RoomContainer } from '../../components/RoomContainer';

import { useAppContext } from '../../context/useAppContext';
import './Home.scss';

const ChatPortal = lazy(() =>
  import('../../components/ChatPortal').then((module) => ({
    default: module.ChatPortal,
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
  const { draw, isChatOpen, rival, winner } = state;

  return (
    <main className="Home--main-container">
      <RoomContainer />

      <Suspense fallback={<h3>Loading...</h3>}>
        {rival.id ? <ScoreBoard /> : null}

        {rival.id ? <TicTacToe /> : null}
        {winner || draw ? <WinningMessage /> : null}
      </Suspense>

      <Suspense>
        {isChatOpen ? <ChatPortal /> : null}
      </Suspense>

      <ChatButton />
    </main>
  );
}
