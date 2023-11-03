import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './core/Nav'
import Foot from './core/Foot'
import { Navigate, Outlet } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import Cookies from 'js-cookie'
import { ProtectedRoutes } from './ProtectedRoutes'
import { RequireAuth } from './RequireAuth'

function App() {
  // const [count, setCount] = useState(0)
  // const auth = Cookies.get('isAuthenticated')
  return (
    <>
      <RequireAuth>
        {/* <Outlet /> */}
        <div className='flex flex-col min-h-screen justify-between'>
          <Nav />
          <div className='flex flex-grow flex-col min-h-full px-10'>
            <Outlet />
            <div className='my-4'><DashboardPage /></div>
          </div>
          <Foot />
        </div>
      </RequireAuth>
    </>
    // <Outlet />
    // <ProtectedRoutes>
    //   <RequireAuth>
    //   </RequireAuth>
    // </ProtectedRoutes>
    // auth ? 
    //   <div className='flex flex-col min-h-screen justify-between'>
    //     <Nav />
    //     <div className='flex flex-grow flex-col min-h-full px-10'>
    //       <Outlet />
    //       {/* <div className='my-4'><DashboardPage /></div> */}
    //     </div>
    //     <Foot />
    //   </div> : <Navigate to='/login' />
  )
}

export default App
