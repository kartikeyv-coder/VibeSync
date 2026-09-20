import React from 'react';

const Message = ({ message: { user, text, type, filename, url, timestamp }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name ? name.trim().toLowerCase() : '';

  const messageTime = timestamp ? new Date(timestamp).toLocaleDateString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  if (user && user.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (

    <div className="flex items-end justify-end gap-2 my-1">
      <span className="text-xs text-slate-500 mb-1 font-medium select-none">
        {trimmedName}
      </span>
      <div className="max-w-[75%] px-4 py-2.5 bg-indigo-600 text-white rounded-2xl rounded-br-xs shadow-md shadow-indigo-600/20">

        {type === 'file' ? (
          <div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={url}
                alt={filename}
                className="max-w-[300px] rounded-lg"
              />
            </a>

            <span className="text-[10px] opacity-70 block text-right mt-1">
              {messageTime}
            </span>
          </div>
        ) : (
          <div>
            <p className="text-sm leading-relaxed break-words">{text}</p>

            <span className="text-[10px] opacity-70 block text-right mt-1">
              {messageTime}
            </span>
          </div>
        )}

      </div>
    </div>
  ) : (

    <div className="flex items-end justify-start gap-2 my-1">
      <div className="max-w-[75%] px-4 py-2.5 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-2xl rounded-bl-xs shadow-md">

        {type === 'file' ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-sm leading-relaxed break-words"
          >
            📎 {filename}
          </a>
        ) : (
          <p className="text-sm leading-relaxed break-words">{text}</p>
        )}

      </div>
      <span className="text-xs text-slate-400 mb-1 font-medium select-none">
        {user}
      </span>
    </div>
  );
};

export default Message;