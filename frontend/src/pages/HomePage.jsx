import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUser, isAdmin } from '../utils/auth'

const HomePage = () => {
  const isLoggedIn = isAuthenticated()
  const user = getUser()
  const userIsAdmin = isAdmin()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-xl p-12 md:p-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Complaint Management System</h1>
          <p className="text-xl text-blue-100 mb-8">
            Streamline your complaint process with our modern, efficient management platform. Submit, track, and resolve complaints with ease.
          </p>
          {!isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
                Get Started
              </Link>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition border-2 border-white">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
                My Dashboard
              </Link>
              <Link to="/submit-complaint" className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition border-2 border-white">
                New Complaint
              </Link>
              {userIsAdmin && (
                <Link to="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold transition">
                  Admin Panel
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 border-t-4 border-blue-500">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Submission</h3>
          <p className="text-gray-600">Submit complaints in just a few clicks with our intuitive form interface.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 border-t-4 border-green-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Tracking</h3>
          <p className="text-gray-600">Track your complaints in real-time and stay updated with instant notifications.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 border-t-4 border-purple-500">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Private</h3>
          <p className="text-gray-600">Your data is encrypted and secure with enterprise-grade security measures.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <p className="text-gray-600 font-medium">Active Users</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
            <p className="text-gray-600 font-medium">Complaints Resolved</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-blue-100 mb-6">Join thousands of users who are already using our platform to manage complaints efficiently.</p>
        {!isLoggedIn && (
          <Link to="/signup" className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
            Sign Up Now
          </Link>
        )}
      </div>
    </div>
  )
}

export default HomePage
