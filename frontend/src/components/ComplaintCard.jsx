import React from 'react'
import { getStatusColor, getStatusBadge } from '../utils/helpers'

const ComplaintCard = ({ complaint, onUpdate, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{complaint.title}</h3>
          <p className="text-sm text-gray-500">ID: {complaint._id?.slice(-8)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2 ${getStatusColor(complaint.status)}`}>
          {getStatusBadge(complaint.status)}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-2">
        {onView && (
          <button onClick={() => onView(complaint)} className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded transition font-medium">
            View Details
          </button>
        )}
        {onUpdate && (
          <select
            value={complaint.status}
            onChange={(e) => onUpdate(complaint._id, e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 hover:border-blue-400 transition focus:outline-none focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        )}
      </div>
    </div>
  )
}

export default ComplaintCard
