import { useEffect } from 'react';
import { Icon } from '../Icon';
import { useAppContext } from '../../context/useAppContext';
import { ACTIONS, ICONS } from '../../utils/constants';
import './ChatButton.scss';

export function ChatButton() {
  const { state, dispatch } = useAppContext();
  const { newMessages, isChatOpen } = state;

  const toggleChat = () => {
    dispatch({ type: ACTIONS.TOGGLE_CHAT });
  };

  useEffect(() => {
    if (isChatOpen) dispatch({ type: ACTIONS.NO_NEW_MESSAGES });
  }, [dispatch, isChatOpen, newMessages]);

  return (
    <button
      className="ChatButton"
      type="button"
      onClick={toggleChat}
    >
      <Icon name={ICONS.MessageCircle} />
      {newMessages > 0 ? (
        <span className="ChatButton--new-messages-notification">
          {newMessages}
        </span>
      ) : null}
    </button>
  );
}
