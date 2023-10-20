import './ChatButton.scss';

export function ChatButton({ onClick }) {
  return (
    <button
      className="ChatButton"
      type="button"
      onClick={onClick}
    >
      C
    </button>
  );
}
