import { useAppContext } from '../../context/useAppContext';
import { ACTIONS } from '../../utils/constants';
import './ChatButton.scss';

export function ChatButton() {
  const { dispatch } = useAppContext();

  const toggleChat = () => {
    dispatch({ type: ACTIONS.TOGGLE_CHAT });
  };

  return (
    <button
      className="ChatButton"
      type="button"
      onClick={toggleChat}
    >
      C
    </button>
  );
}
