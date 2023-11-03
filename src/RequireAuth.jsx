import React from 'react'
import { useAuth } from './ProtectedRoutes'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const RequireAuth = ({ children }) => {
  // const auth = useAuth()
  if (!Cookies.get('isAuthenticated')) {
    return <Navigate to='/login' />
  }
  return children
}