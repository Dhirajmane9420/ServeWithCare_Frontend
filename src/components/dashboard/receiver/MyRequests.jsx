import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyRequests = () => { 
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Define the function that fetches data
    const loadMyRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/requests/me');
        setMyRequests(res.data);
        setError(null);
      } catch (err) {
        console.error('Error loading requests:', err);
        setError("Failed to load your requests history.");
      } finally {
        setLoading(false);
      }
    };

    loadMyRequests();

    // 3. Set a timer to reload every 10 seconds for real-time status updates
    const intervalId = setInterval(loadMyRequests, 10000); 

    // 4. Cleanup: clear the interval when the component unmounts
    return () => clearInterval(intervalId); 
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div id="requests" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">My Requests</h2>
      <div className="overflow-x-auto">
        
        {loading && (
          <p className="p-4 text-center text-primary dark:text-accent-yellow">Loading request history...</p>
        )}

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            
            <thead className="bg-light-bg dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Food Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Action</th>
              </tr>
            </thead>
            
            <tbody className="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
              {myRequests.length > 0 ? (
                myRequests.map((req) => (
                  <tr key={req._id}>
                    {/* --- POPULATED CELLS (The fix) --- */}
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">
                      {req.donation ? req.donation.foodType : 'Donation Removed'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">
                      {req.donation ? req.donation.quantity : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.status === 'Accepted' && (
                        <Link 
                          to={`/chat/${req._id}`} // The chat ID is the request ID
                          className="px-4 py-2 rounded-full text-white bg-primary hover:bg-opacity-80"
                        >
                          Chat
                        </Link>
                      )}
                      {req.status === 'Completed' && (
                        <span className="px-4 py-2 text-xs rounded-full text-green-700 border border-green-700">
                          Picked Up
                        </span>
                      )}
                    </td>
                    {/* --- END POPULATED CELLS --- */}
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">You haven't made any requests yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default MyRequests;