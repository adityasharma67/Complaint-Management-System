import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { complaintsAPI } from '../api/client'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { isAdmin } from '../utils/auth'

const SubmitComplaintPage = () => {
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin()) {
      toast.error('Admins cannot submit complaints')
      navigate('/admin')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      await complaintsAPI.submit(formData)
      toast.success('Complaint submitted successfully!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit complaint'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Submit a Complaint</h1>
            <p className="text-gray-600">We're here to help. Please describe your issue in detail.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title of your complaint"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your complaint"
                required
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition resize-none"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Describe your issue clearly and provide relevant details</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Your complaint will be reviewed by our admin team. You will receive updates via email as we work on resolving your issue.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitComplaintPage
