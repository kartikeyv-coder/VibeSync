import React from 'react';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name ? name.trim().toLowerCase() : '';

  if (user && user.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
 
    <div className="flex items-end justify-end gap-2 my-1">
      <span className="text-xs text-slate-500 mb-1 font-medium select-none">
        {trimmedName}
      </span>
      <div className="max-w-[75%] px-4 py-2.5 bg-indigo-600 text-white rounded-2xl rounded-br-xs shadow-md shadow-indigo-600/20">
        <p className="text-sm leading-relaxed break-words">{text}</p>
      </div>
    </div>
  ) : (
  
    <div className="flex items-end justify-start gap-2 my-1">
      <div className="max-w-[75%] px-4 py-2.5 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-2xl rounded-bl-xs shadow-md">
        <p className="text-sm leading-relaxed break-words">{text}</p>
      </div>
      <span className="text-xs text-slate-400 mb-1 font-medium select-none">
        {user}
      </span>
    </div>
  );
};

export default Message;