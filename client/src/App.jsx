import { useState } from 'react';
import { Home } from './pages/Home';
import { ChatButton } from './components/ChatButton';
import { ChatPortal } from './components/ChatPortal';
import { LoginForm } from './components/LoginForm';
import { Message } from './components/Message';
import './App.scss';

function App() {
  const [userData, setUserData] = useState({ username: '' });
  const [sessionData, setSessionData] = useState({
    darkMode: true,
    isChatOpen: false,
    messages: [],
  });

  const toggleChat = () => {
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      isChatOpen: !prevSessionData.isChatOpen,
    }));
  };

  const closeChat = () => {
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      isChatOpen: false,
    }));
  };

  const addMessage = (content) => {
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      messages: [
        ...prevSessionData.messages,
        { sender: userData.username, content },
      ],
    }));
  };

  return (
    <>
      {userData.username.length === 0 ? (
        <LoginForm setUserData={setUserData} />
      ) : (
        <Home>
          <ChatButton onClick={toggleChat} />
          {sessionData.isChatOpen ? (
            <ChatPortal
              closeChat={closeChat}
              addMessage={addMessage}
            >
              {sessionData.messages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  isSameUser={message.sender === userData.username}
                />
              ))}
            </ChatPortal>
          ) : null}
        </Home>
      )}
    </>
  );
}

export default App;
