import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import Infobar from './Infobar';
import Input from './Input';
import Messages from './Messages';
import TextContainer from './TextContainer';

const ENDPOINT = 'http://localhost:8000';

let socket;

const Chat = () => {
  const location = useLocation();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [user, setUser] = useState([])
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get name and room from URL
    const { name, room } = queryString.parse(location.search);

    console.log('Name:', name);
    console.log('Room:', room);

    // Create socket connection
    socket = io(ENDPOINT);

    // Socket connected
    socket.on('connect', () => {
      console.log(' Connected to server');
      console.log('Socket ID:', socket.id);
    });

    // Socket connection error
    socket.on('connect_error', (error) => {
      console.error(' Connection error:', error);
    });

    // Set name and room
    setName(name);
    setRoom(room);

    // Listen for messages
    socket.on('message', (message) => {
      console.log(' Message received:', message);

      setMessages((prevMessages) => [
        ...prevMessages,
        message
      ]);
    });

    socket.on('roomData', ({ user }) => {
      console.log('Online User:', user)
      setUser(user);
    })

    // Join room
    console.log(' Joining room:', room);

    socket.emit(
      'join',
      { name, room },
      (error) => {
        if (error) {
          console.error(' Join error:', error);
          alert(error);
        } else {
          console.log(' Joined room:', room);
        }
      }
    );

    // Cleanup
    return () => {
      console.log(' Disconnecting socket');

      socket.off('connect');
      socket.off('connect_error');
      socket.off('message');

      socket.disconnect();
    };

  }, [location.search]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    console.log(' Sending:', message);

    socket.emit('sendMessage', message, () => {
      console.log(' Message sent successfully');
      setMessage('');
    });
  };

  console.log('Current messages:', messages);

  //SEND FILES

  const sendFile = async (file) => {
    try {
      const formData = new FormData();

      formData.append('file', file);

      console.log('Uploading file:', file.name);

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'File upload failed');
      }

      console.log('File uploaded:', data);

      socket.emit('sendMessage', {
        type: 'file',
        filename: data.filename,
        url: data.url
      });

    } catch (error) {
      console.error('File Upload error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">

      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-slate-900/10 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl justify-between">

        <Infobar room={room} />

        <Messages
          messages={messages}
          name={name}
        />

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          sendFile={sendFile}
        />

        <div className='w-full md:w-72 flex-shrink-0'>

          <TextContainer user={user} />
        </div>

      </div>

    </div>
  );
};

export default Chat;