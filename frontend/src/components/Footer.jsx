import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">About CMS</h3>
            <p className="text-sm">A modern complaint management system built with React and Express.js for efficient complaint tracking and resolution.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Features</h3>
            <ul className="text-sm space-y-2">
              <li>• Easy complaint submission</li>
              <li>• Real-time status tracking</li>
              <li>• Admin dashboard</li>
              <li>• Secure authentication</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Support</h3>
            <ul className="text-sm space-y-2">
              <li>Email: support@cms.com</li>
              <li>Phone: +1-800-SUPPORT</li>
              <li>Hours: 24/7 Support</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2024 Complaint Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
