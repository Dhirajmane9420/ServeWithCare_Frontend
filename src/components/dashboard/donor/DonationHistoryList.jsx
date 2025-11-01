import { useState, useEffect } from 'react';
import axios from 'axios';

const DonationHistoryList = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:5000'; // TEMPORARY FIX

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/donations/me`);
        
        const data = Array.isArray(res.data) ? res.data : [];
        setHistory(data);
        setError(null);
      } catch (err) {
        console.error('Error loading history:', err);
        setError("Failed to load your donation history.");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Requested': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div id="history" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">My Donation History</h2>
      
      {loading && (<p className="p-4 text-center text-primary dark:text-accent-yellow">Loading full history...</p>)}
      {error && (<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">{error}</div>)}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-light-bg dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Food Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Date Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-dark dark:text-text-light uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
              {history.length > 0 ? (
                history.map((donation) => (
                  <tr key={donation._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">{donation.foodType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">{donation.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-dark dark:text-text-light">{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">You have not posted any donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationHistoryList;