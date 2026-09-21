import React from 'react';
import { useRef } from 'react';

const Input = ({ message, setMessage, sendMessage, sendFile, handleTyping }) => {

  const FileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log('Selected file:', file);
      sendFile(file);
    }

    // Allows selecting the same file again
    e.target.value = '';
  };

  return (
    <form
      onSubmit={sendMessage}
      className="flex items-center gap-2 p-3 bg-slate-900/80 border-t border-slate-800 rounded-b-2xl"
    >

      {/* Hidden file input */}
      <input
        type="file"
        ref={FileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* File upload button */}
      <button
        type="button"
        onClick={() => FileInputRef.current.click()}
        className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition duration-200"
      >
        📎
      </button>

      <input
        type="text"
        className="flex-1 px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          handleTyping(e.target.value)
        }}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />

      <button
        type="submit"
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition duration-200 shadow-md shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
        onClick={(e) => sendMessage(e)}
      >
        <span>Send</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 -rotate-45"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>

    </form>
  );
};

export default Input;