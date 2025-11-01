import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyDonations = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';// Temporary hardcode fix

  const loadRequests = async () => {
    try {
      // --- FIX: Removed manual token headers ---
      // Relies on the global header set by App.jsx
      const res = await axios.get(`${API_URL}/api/requests/incoming`);
      
      const data = Array.isArray(res.data) ? res.data : [];
      setIncomingRequests(data);
      setError(null);
    } catch (err) {
      console.error('Error loading requests:', err);
      setError("Failed to load incoming requests.");
      setIncomingRequests([]); 
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadRequests(); // Initial load
    const intervalId = setInterval(loadRequests, 10000); 
    return () => clearInterval(intervalId);
  }, []); 

  const handleAccept = async (requestId) => {
    try {
      // --- FIX: Removed manual token headers ---
      // Relies on the global header set by App.jsx
      await axios.put(`${API_URL}/api/requests/${requestId}/accept`, {});
      
      // Update the UI immediately
      setIncomingRequests(
        incomingRequests.map(req => 
          req._id === requestId ? { ...req, status: 'Accepted' } : req
        )
      );
      
      alert('Request accepted! The receiver has been notified.');
      
    } catch (err) {
      console.error('Error accepting request:', err);
      alert('Failed to accept request.');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div id="donations" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">Incoming Requests</h2>
      <div className="overflow-x-auto">
        
        {loading && (<p className="p-4 text-center text-primary dark:text-accent-yellow">Loading incoming requests...</p>)}
        {error && (<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">{error}</div>)}
        
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-light-bg dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Food Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Requested By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
              {incomingRequests.length > 0 ? (
                incomingRequests.map((req) => (
                  <tr key={req._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">
                      {req.donation ? req.donation.foodType : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">
                      {req.donation ? req.donation.quantity : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowJ-wrap text-text-dark dark:text-text-light">
                      {req.receiver ? req.receiver.name : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.status === 'Pending' && (
                        <button 
                          onClick={() => handleAccept(req._id)}
                          className="px-4 py-2 rounded-full text-white bg-green-500 hover:bg-green-600"
                        >
                          Accept
                        </button>
                      )}
                      {req.status === 'Accepted' && (
                        <Link 
                          to={`/chat/${req._id}`} 
                          className="px-4 py-2 rounded-full text-white bg-primary hover:bg-opacity-80"
                        >
                          Chat
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500 dark:text-gray-400">You have no incoming requests.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyDonations;