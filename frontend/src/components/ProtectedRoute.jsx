import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import Spinner from './Spinner'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

export default ProtectedRoute
