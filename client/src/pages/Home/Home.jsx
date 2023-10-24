import { ChatButton } from '../../components/ChatButton';
import { ChatPortal } from '../../components/ChatPortal';
import { RoomContainer } from '../../components/RoomContainer';
import { ScoreBoard } from '../../components/ScoreBoard';
import { TicTacToe } from '../../components/TicTacToe';
import { WinningMessage } from '../../components/WinningMessage';
import { useAppContext } from '../../context/useAppContext';
import './Home.scss';

export function Home() {
  const { state } = useAppContext();
  const { draw, isChatOpen, rival, winner } = state;

  return (
    <main className="Home--main-container">
      <RoomContainer />

      {rival.id ? <ScoreBoard /> : null}

      {rival.id ? <TicTacToe /> : null}
      {winner || draw ? <WinningMessage /> : null}

      <ChatButton />

      {isChatOpen ? <ChatPortal /> : null}
    </main>
  );
}
