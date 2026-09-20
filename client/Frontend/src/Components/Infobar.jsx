import { CloseIcon } from 'flowbite-react'
import React from 'react'

import onlineIcon from '../Icon/onlineIcon.png'
import closeIcon from '../Icon/closeIcon.png'

const Infobar = ({ room }) => {
    return (
        <div className='flex items-center justify-between w-full px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 rounded-t-2xl'>
            <div className='flex items-center gap-3'>
                <img className='w-3 h-3 object-contain drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]'
                    src={onlineIcon} alt="Online-Icon" />
                <h1 className='text-white font-semibold tracking-wide m-0'
                >{room}</h1>
            </div>
            <div className='flex items-center'>
                <a href="/" className='hover:bg-slate-700/50 p-2 rounded-full transition duration-200'>
                    <img
                        className='w-4 h-4 object-contain opacity-70 hover:opacity-100 transition '
                        src={closeIcon} alt="Close_Icon" />
                </a>
            </div>

        </div>
    )
}

export default Infobar

/**
 * Full Page refers of the html is not good
 * as 
 */
