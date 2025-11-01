import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import StatCard from '../components/dashboard/StatCard.jsx';
import axios from 'axios';
import { FaStore, FaTruck, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaUtensils } from 'react-icons/fa';

const ReceiverDashboard = () => {
  const [user, setUser] = useState({ name: 'Receiver' });
  const [stats, setStats] = useState({ totalRequests: 0, acceptedRequests: 0, verifiedDonors: 15, availableDonations: 0, pendingPickup: 0 }); 
  const [loading, setLoading] = useState(true);

  // TEMPORARY FIX: Use direct URL to bypass failing ENV system
  const API_URL = 'http://localhost:5000'; 

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Get User Data (For Name)
        const userRes = await axios.get(`${API_URL}/api/users/me`);
        setUser(userRes.data);

        // 2. Get Requests Data (For Counts)
        const requestsRes = await axios.get(`${API_URL}/api/requests/me`);
        const availableRes = await axios.get(`${API_URL}/api/donations/available`);

        // --- CRITICAL DATA SAFEGUARD ---
        const requestsData = Array.isArray(requestsRes.data) ? requestsRes.data : [];
        const availableData = Array.isArray(availableRes.data) ? availableRes.data : [];
        
        // Calculation logic:
        const totalRequests = requestsData.length;
        const acceptedRequests = requestsData.filter(r => r.status === 'Accepted' || r.status === 'Completed').length;
        const pendingPickup = requestsData.filter(r => r.status === 'Accepted').length;

        setStats({
          totalRequests: totalRequests,
          acceptedRequests: acceptedRequests,
          verifiedDonors: 15, // Mocked
          availableDonations: availableData.length,
          pendingPickup: pendingPickup,
        });

      } catch (err) {
        console.error("Error loading dashboard data:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold font-serif text-primary-dark dark:text-white mb-6">
        {/* FIX: Use ternary operator to display name only when loaded */}
        Welcome, {loading ? '...' : user.name}!
      </h1>

      {loading && (
        <p className="text-primary dark:text-accent-yellow">Loading dashboard stats...</p>
      )}

      {!loading && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Requests Made" value={stats.totalRequests} />
            <StatCard title="Accepted Pickups" value={stats.acceptedRequests} />
            <StatCard title="Available Now" value={stats.availableDonations} />
            <StatCard title="Verified Donors" value={stats.verifiedDonors} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {/* --- 1. Quick Action Card --- */}
            <div className="bg-accent-orange text-white p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <FaMapMarkerAlt size={24} className="mb-3" />
              <h3 className="text-2xl font-bold mb-3">
                {stats.pendingPickup > 0 ? 'PICKUP PENDING!' : 'Find Fresh Donations'}
              </h3>
              <p className="mb-4 opacity-90">
                {stats.pendingPickup > 0 
                  ? `You have ${stats.pendingPickup} donation(s) accepted and ready for pickup.`
                  : "Browse the latest listings in your area now."
                }
              </p>
              <Link 
                to={stats.pendingPickup > 0 ? "/dashboard/receiver/requests" : "/dashboard/receiver/available"}
                className="inline-flex items-center text-white font-semibold border-b border-white hover:text-opacity-80 transition-colors"
              >
                {stats.pendingPickup > 0 ? 'Go to My Requests' : 'View Available Food'} <FaArrowRight className="ml-2 w-3" />
              </Link>
            </div>
            
            {/* --- 2. Recent Activity/Summary Feed --- */}
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                Recent Statuses
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Your request for Canned Goods was accepted.
                </p>
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaTruck className="text-blue-500 mr-3" />
                  Pickup for Fresh Bread scheduled.
                </p>
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaStore className="text-primary mr-3" />
                  New items added by a local donor.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiverDashboard;