import './Message.scss';

export function Message({ sender, content, isSameUser }) {
  return (
    <div className={`Message ${isSameUser ? 'same-user' : ''}`}>
      <p className={`Message--text-content ${isSameUser ? 'same-user' : ''}`}>
        <span className="Message--text-sender">{sender}:</span> {content}
      </p>
    </div>
  );
}
