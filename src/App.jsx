import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './core/Nav'
import Foot from './core/Foot'
import { Outlet } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Outlet />
    <>
      <div className='flex flex-col min-h-screen justify-between'>
        <Nav />
        <div className='flex flex-grow flex-col min-h-full px-10 bg-slate-300'>
          <div className='my-4'><DashboardPage /></div>
        </div>
        <Foot />
      </div>
    </>
  )
}

export default App
