import React, { useState, useEffect } from 'react'
import { adminAPI } from '../api/client'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { getStatusColor, getStatusBadge, formatDateTime } from '../utils/helpers'

const AdminDashboardPage = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllComplaints()
      setComplaints(response.data)
    } catch (error) {
      toast.error('Failed to load complaints')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (complaintId, newStatus) => {
    setUpdating(true)
    try {
      await adminAPI.updateComplaintStatus(complaintId, newStatus)
      setComplaints((prev) =>
        prev.map((c) => (c._id === complaintId ? { ...c, status: newStatus } : c))
      )
      if (selectedComplaint?._id === complaintId) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus })
      }
      toast.success('Complaint status updated')
    } catch (error) {
      toast.error('Failed to update status')
    } finally {
      setUpdating(false)
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage all complaints and track their status</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Complaints Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition w-full"
            >
              <option value="all">All Complaints</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No complaints found
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <td className="py-3 px-4 text-gray-800 font-medium truncate">{complaint.title}</td>
                      <td className="py-3 px-4 text-gray-600">{complaint.userId?.name || 'Unknown'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(complaint.status)}`}>
                          {getStatusBadge(complaint.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{formatDateTime(complaint.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaint Details Sidebar */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {selectedComplaint ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Complaint Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Title</p>
                  <p className="text-gray-800">{selectedComplaint.title}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Complaint ID</p>
                  <p className="text-gray-800 break-all font-mono text-xs">{selectedComplaint._id}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">User</p>
                  <p className="text-gray-800">{selectedComplaint.userId?.name}</p>
                  <p className="text-gray-600 text-sm">{selectedComplaint.userId?.email}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'in_progress', 'resolved'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedComplaint._id, status)}
                        disabled={updating}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          selectedComplaint.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {getStatusBadge(status)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Description</p>
                  <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">{selectedComplaint.description}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Submitted</p>
                  <p className="text-gray-800">{formatDateTime(selectedComplaint.createdAt)}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a complaint to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
