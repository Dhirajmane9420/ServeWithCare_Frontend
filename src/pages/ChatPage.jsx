import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from 'axios'; 

const socket = io('http://localhost:5000'); 

const ChatPage = () => {
  const { requestId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  // --- NEW: Get user data from session ---
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || {};
  const userRole = loggedInUser.role;
  const userName = loggedInUser.name;
  
  const chatEndRef = useRef(null); 

  const loadChatHistory = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/${requestId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  }, [requestId]);

  useEffect(() => {
    loadChatHistory();
    socket.emit('join_chat', requestId);
    
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [requestId, loadChatHistory]); 

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      requestId: requestId,
      sender: userRole,
      senderName: userName, // <-- NEW: Include the sender's name
      text: newMessage.trim(),
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center pb-4 border-b dark:border-gray-700">
        <Link 
          to={userRole === 'donor' ? '/dashboard/donor/donations' : '/dashboard/receiver/requests'}
          className="p-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg mr-4 text-primary-dark dark:text-dark-text"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="text-2xl font-bold text-primary-dark dark:text-white">
          Chat with {userRole === 'donor' ? 'Receiver' : 'Donor'}
        </h2>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id || msg._id} 
            className={`flex ${msg.senderRole === userRole ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-xs shadow-md ${
                msg.senderRole === userRole 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-light-bg dark:bg-dark-bg text-text-dark dark:text-text-light rounded-bl-none'
              }`}
            >
              <p className="font-bold text-sm mb-1">
                {msg.senderRole === userRole ? 'You' : msg.senderName || msg.senderRole}
              </p>
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-700 flex space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-full text-white bg-primary hover:bg-opacity-80"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;