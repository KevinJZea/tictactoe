import './Message.scss';

export function Message({ sender, content, isSameUser }) {
  const isServer = sender === 'server';
  return (
    <div
      className={`
        Message
        ${isSameUser ? 'same-user' : ''}
        ${isServer ? 'server' : ''}
      `}
    >
      <p className={'Message--text-content'}>
        <span className="Message--text-sender">
          {!isServer ? `${sender}: ` : null}
        </span>
        {content}
      </p>
    </div>
  );
}
