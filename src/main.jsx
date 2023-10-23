import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import Cookies from 'js-cookie'
import LoginPage from './pages/LoginPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import Report from './components/Report.jsx'

const isLogin = Cookies.get('isAuthenticated')
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/a',
        element: <div>a</div>
      },
      {
        path: '/b',
        element: <div>b</div>
      },
      {
        path: '/report',
        element: <Report />
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    {/* {isLogin ? <App /> : <LoginPage />} */}
    <App />
  </React.StrictMode>,
)
