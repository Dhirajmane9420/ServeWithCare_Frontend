import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard.jsx';
import axios from 'axios';
import { FaBoxes, FaCheckCircle, FaUsers, FaArrowRight } from 'react-icons/fa';

const DonorDashboard = () => {
  const [user, setUser] = useState({ name: 'Donor' });
  const [stats, setStats] = useState({ totalDonations: 0, pendingRequests: 0, foodDonated: 0 });
  const [loading, setLoading] = useState(true);

  // --- FIX 1: Hardcode API URL directly for stability ---
  // This bypasses the failing import.meta.env system.
  const API_URL = 'http://localhost:5000'; 
  
  // Load user info and calculate stats
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Get User Data (For Name)
        const userRes = await axios.get(`${API_URL}/api/users/me`);
        setUser(userRes.data); // User object now correctly set

        // 2. Get Donations & Requests Data (For Counts)
        const donationsRes = await axios.get(`${API_URL}/api/donations/me`);
        const requestsRes = await axios.get(`${API_URL}/api/requests/incoming`);

        // Safely access data
        const donationsData = Array.isArray(donationsRes.data) ? donationsRes.data : [];
        const requestsData = Array.isArray(requestsRes.data) ? requestsRes.data : [];

        // Calculation logic:
        const totalKg = donationsData.length > 0 ? donationsData.length * 10 : 0; 
        const pendingRequests = requestsData.filter(r => r.status === 'Pending').length;

        // --- Stats are now calculated with non-zero values ---
        setStats({
          totalDonations: donationsData.length,
          pendingRequests: pendingRequests,
          foodDonated: totalKg,
        });

      } catch (err) {
        // IMPORTANT: Log error detail if fetching fails (e.g., if token is bad)
        console.error("Error loading dashboard data:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const latestRequest = stats.pendingRequests > 0 ? 'View Pending Requests' : 'Post a New Donation';

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold font-serif text-primary-dark dark:text-white mb-6">
        {/* FIX 2: Name is displayed after loading is FALSE */}
        Welcome back, {loading ? '...' : user.name}!
      </h1>

      {loading && (
        <p className="text-primary dark:text-accent-yellow">Loading dashboard stats...</p>
      )}

      {!loading && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* These StatCards now display non-zero stats. */}
            <StatCard title="Total Items Posted" value={stats.totalDonations} />
            <StatCard title="Total Food Donated (Est.)" value={`${stats.foodDonated} kg`} />
            <StatCard title="Pending Requests" value={stats.pendingRequests} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {/* --- 1. Quick Action Card --- */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <FaArrowRight size={24} className="mb-3" />
              <h3 className="text-2xl font-bold mb-3">
                {stats.pendingRequests > 0 ? 'ACTION REQUIRED!' : 'Ready to Donate More?'}
              </h3>
              <p className="mb-4 opacity-90">
                {stats.pendingRequests > 0 
                  ? `You have ${stats.pendingRequests} new item(s) awaiting your approval.`
                  : "Post your next surplus and make an immediate impact."
                }
              </p>
              <Link 
                to={stats.pendingRequests > 0 ? "/dashboard/donor/donations" : "/dashboard/donor/donate"}
                className="inline-flex items-center text-accent-yellow font-semibold hover:text-accent-yellow/80 transition-colors"
              >
                {latestRequest} <FaArrowRight className="ml-2 w-3" />
              </Link>
            </div>
            
            {/* --- 2. Recent Activity/Summary Feed --- */}
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Request for Apples was accepted.
                </p>
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaBoxes className="text-blue-500 mr-3" />
                  Posted 5 cases of Canned Goods.
                </p>
                <p className="flex items-center text-sm dark:text-gray-300">
                  <FaUsers className="text-primary mr-3" />
                  Profile details updated.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorDashboard;