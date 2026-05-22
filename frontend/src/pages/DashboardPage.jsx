import React, { useState, useEffect } from 'react'
import { complaintsAPI } from '../api/client'
import { getUser } from '../utils/auth'
import Spinner from '../components/Spinner'
import ComplaintCard from '../components/ComplaintCard'
import { toast } from 'react-toastify'

const DashboardPage = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const user = getUser()

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const response = await complaintsAPI.getMyComplaints()
      setComplaints(response.data)
    } catch (error) {
      toast.error('Failed to load complaints')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredComplaints = filterStatus === 'all' ? complaints : complaints.filter((c) => c.status === filterStatus)

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    inProgress: complaints.filter((c) => c.status === 'in_progress' || c.status === 'in-progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Complaints</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm font-medium mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium mb-2">In Progress</p>
          <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium mb-2">Resolved</p>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        >
          <option value="all">All Complaints</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Complaints List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Complaints ({filteredComplaints.length})</h2>
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No complaints found</p>
            <p className="text-gray-400">You don't have any complaints yet. Submit one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
