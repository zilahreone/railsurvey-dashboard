import React from 'react'
import { useAuth } from './ProtectedRoutes'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const RequireAuth = ({ children }) => {
  // const auth = useAuth()
  if (!Cookies.get('isAuthenticated')) {
    return <Navigate to='/login' />
  } else {
    Cookies.set('isAuthenticated', Cookies.get('isAuthenticated'), { expires: 0.125 })
  }
  return children
}