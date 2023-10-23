import React from 'react'
import rmtLogo from '@images/bg/rmt-logo.png'
import srtLogo from '@images/bg/srt-logo.png'

function Nav() {
  return (
    <>
      <nav className="bg-white border-gray-300">
        <div className="flex justify-between items-center px-10">
          <div className='flex gap-1 items-center py-2'>
            <img src={srtLogo} alt="logo" className="h-10" />
            <img src={rmtLogo} alt="logo" className="h-8" />
          </div>
          <div className="mx-auto">
            <span className='font-bold text-xl'>Dashboard Failure of Rail</span>
          </div>
          <div className="space-x-0">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav