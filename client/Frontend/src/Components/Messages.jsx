import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className='flex-1 
        overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800'>
            {
                messages.map((message, i) => (
                    <div key={i} className='flex flex-col'>
                        <Message message={message} name={name} />
                    </div>
                ))
            }
        </ScrollToBottom>
    );
};

export default Messages;