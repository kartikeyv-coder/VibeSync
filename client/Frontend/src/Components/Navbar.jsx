import React from 'react'
import screen from '../Icon/screen.png'
import { Link } from 'react-router-dom'

const Navbar = ({ room }) => {
    return (
        <header className='w-full bg-[#101123] border-b border-white/10 px-6 py-3 absolute'>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                {/* This Part will contain the logo */}
                <div className='flex items-center gap-4'>
                    <div className='bg-[#1b1c3a] p-2.5 rounded-2xl border border-white/5 shadow-md flex items-center justify-center'>
                        <img
                            src={screen}
                            alt="Logo"
                            className='h-10 w-10 object-contain' />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-400 bg-clip-text text-transparent inline-block">
                        VibeSync
                    </span>
                </div>

                <nav className='hidden md:flex items-center gap-12 text-md font-medium text-gray-300'>
                    <a href="" className='hover:text-white transition-colors'>Features</a>
                    <a href="" className='hover:text-white transition-colors'>About</a>
                    <a href="" className='hover:text-white transition-colors'>Pricing</a>
                    <a href="" className='hover:text-white transition-colors'>Contact</a>
                </nav>

                <div className="flex items-center gap-3">

                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>

                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-200 border border-purple-400/20">
                        <span>Get Started</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                </div>

            </div>

        </header >
    )
}

export default Navbar

