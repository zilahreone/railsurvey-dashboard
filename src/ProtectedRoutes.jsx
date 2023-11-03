import Cookies from 'js-cookie'
import React, { createContext, useContext, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

export const ProtectedRoutes = ({ children }) => {
  const [user, setUser] = useState(Cookies.get('isAuthenticated'))
  
  const login = (user) => {
    console.log(user);
    setUser(user)
  }
  const logout = () => {
    setUser(null)
    Cookies.remove('isAuthenticated')
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}