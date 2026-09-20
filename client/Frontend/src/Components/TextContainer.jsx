import React from 'react';
import onlineIcon from '../Icon/onlineIcon.png';

const TextContainer = ({ user }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl text-slate-200">


      {user ? (
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Online Users</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">
              {user.length}
            </span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {user.map(({ name }) => (
              <div
                key={name}
                className="flex items-center justify-between px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl"
              >
                <span className="text-sm font-medium text-slate-200 capitalize">
                  {name}
                </span>
                <img
                  className="w-2.5 h-2.5 object-contain drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]"
                  src={onlineIcon}
                  alt="Active"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextContainer;