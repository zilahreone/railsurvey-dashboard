import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import LoginPage from './pages/LoginPage'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import Report from './components/Report.jsx'
import { ProtectedRoutes } from './ProtectedRoutes.jsx'
import { RequireAuth } from './RequireAuth.jsx'
import Cookies from 'js-cookie'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App />
      // <RequireAuth>
      //   <DashboardPage />
      // </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
    // children: [{
    //   path: '/',
    //   element: <DashboardPage />,
    //   errorElement: <NotFoundPage />,
    // }],
  },
  {
    path: '/login',
    element: !Cookies.get('isAuthenticated') ? <LoginPage /> : <Navigate to={`/`} />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ProtectedRoutes>
      <RequireAuth>
      </RequireAuth>
    </ProtectedRoutes> */}
    <RouterProvider router={router}  future={{ v7_startTransition: true }} />
    {/* {!isLogin ? <App /> : <LoginPage />} */}
    {/* <App /> */}
  </React.StrictMode>,
)
