import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, getUser, isAdmin, logout } from '../utils/auth'

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const user = getUser()
  const isUserAdmin = isAdmin()
  const isLoggedIn = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-100 transition">
            <span>📋</span>
            <span>CMS</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-blue-700 rounded transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-blue-100 transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition font-medium">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="text-blue-100">Welcome, {user?.name}</span>
                <Link to="/dashboard" className="hover:text-blue-100 transition">
                  Dashboard
                </Link>
                <Link to="/submit-complaint" className="hover:text-blue-100 transition">
                  New Complaint
                </Link>
                {isUserAdmin && (
                  <Link to="/admin" className="hover:text-blue-100 transition">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-medium">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="block hover:text-blue-100 transition py-2">
                  Login
                </Link>
                <Link to="/signup" className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition font-medium">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <p className="text-blue-100 py-2">Welcome, {user?.name}</p>
                <Link to="/dashboard" className="block hover:text-blue-100 transition py-2">
                  Dashboard
                </Link>
                <Link to="/submit-complaint" className="block hover:text-blue-100 transition py-2">
                  New Complaint
                </Link>
                {isUserAdmin && (
                  <Link to="/admin" className="block hover:text-blue-100 transition py-2">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-medium">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
