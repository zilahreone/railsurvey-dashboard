import React, { useEffect, useState } from 'react'
import rmtLogo from '@images/bg/rmt-logo.png'
import srtLogo from '@images/bg/srt-logo.png'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('isAuthenticated')
    setIsActive(false)
    window.location.reload()
    // navigate('/', { replace: true })
  }
  
  // useEffect(() => {
  // }, [Cookies.get('isAuthenticated')])
  return (
    <>
      <nav className="bg-yellow-500 border-gray-300">
        <div className="flex justify-between items-center px-10">
          <div className='flex gap-1 items-center py-2'>
            <img src={srtLogo} alt="logo" className="h-10" />
            <img src={rmtLogo} alt="logo" className="h-8" />
          </div>
          <div className="mx-auto">
            <span className='font-bold text-xl invisible md:visible'>Dashboard Failure of Rail</span>
          </div>
          <div className="space-x-0">
            <div className="relative inline-block text-left">
              <div>
                <button onClick={() => setIsActive(!isActive)} className='focus:outline-none focus:ring-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>
              </div>
              {
                isActive && (
                  <div onMouseLeave={() => setIsActive(false)} className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <p href="#" className="text-gray-700 block px-4 py-2 text-sm">{Cookies.get('isAuthenticated')}</p>
                      {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm">Support</a>
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm">License</a>
                      <form method="POST" action="#">
                        <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm">Sign out</button>
                      </form> */}
                    </div>
                    <div className=''>
                      <button onClick={handleLogout} className="text-gray-700 font-semibold block px-4 py-2 text-sm w-full">Logout</button>
                    </div>
                  </div>
                )
              }
            </div>
            
            {/* <div class="relative inline-block text-left">
              <div>
                <button  onClick={() => setIsActive(!isActive)} type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  Options
                  <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              {
                isActive && (
                  <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                      <form method="POST" action="#" role="none">
                        <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                      </form>
                    </div>
                  </div>
                )
              }
            </div> */}

          </div>
          {/* {isActive && (
            <div id="dropdownAvatar" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
              </ul>
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </div>
            </div>
          )} */}
        </div>
      </nav>
    </>
  )
}

export default Nav