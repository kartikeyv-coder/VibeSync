import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div>
      <Navbar room={room}/>
      <div className='joinOuterContainer w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4'>
        <div className='joinInnerContainer w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl'>
          <h1 className='text-2xl font-bold text-slate-100 mb-6'>
            Join
          </h1>
          <div>
            <label className='block text-sm font-medium text-slate-400 mb-1'>Name: </label>
            <input type="text" className='joinInput w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition' placeholder='Name' onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-400 mb-1'>Room: </label>
            <input type="text" className='joinInput w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-300 transition' placeholder='Room' onChange={(e) => setRoom(e.target.value)} />
          </div>

          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className='btn w-full py-2.5 mt-5 bg-slate-600 backdrop-blur-md  hover:bg-indigo-500 rounded-lg transition shadow-lg shadow-indigo-600/20 hover:cursor-pointer ' type='submit'>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Join
