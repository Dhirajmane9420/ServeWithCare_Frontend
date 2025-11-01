import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaList, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const categories = ['All', 'Bakery', 'Produce', 'Canned Goods', 'Prepared Meals', 'Dairy'];

const AvailableDonations = () => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('list'); 

  // Use the (temporary) hardcoded API URL for stability
  const API_URL = 'http://localhost:5000'; 

  useEffect(() => {
    const loadAvailableDonations = async () => {
      try {
        // --- FIX: REMOVED MANUAL TOKEN HANDLING ---
        // We rely on the global setAuthToken utility (called in App.jsx)
        // to automatically add the 'x-auth-token' header.
        const res = await axios.get(`${API_URL}/api/donations/available`);
        
        const data = Array.isArray(res.data) ? res.data : [];
        setAllDonations(data);
        setError(null);
      } catch (err) {
        console.error('Error loading donations:', err);
        const errorMsg = err.response?.data?.msg || "Could not load listings. Please check server status and try again.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    loadAvailableDonations();
  }, []); 

  const handleRequestFood = async (item) => {
    try {
      // --- FIX: REMOVED MANUAL TOKEN HANDLING ---
      // The global axios header will be used.
      // We just send the empty {} body required by the POST request.
      await axios.post(`${API_URL}/api/requests/${item._id}`, {});
      
      alert(`Request sent for ${item.foodType}!`);
      
      // After requesting, remove it from the list
      setAllDonations(allDonations.filter(d => d._id !== item._id));

    } catch (err) {
      console.error('Error making request:', err);
      if (err.response && err.response.data) {
        alert(err.response.data.msg); 
      } else {
        alert('Failed to send request.');
      }
    }
  };

  // --- Filtering Logic ---
  const filteredDonations = allDonations
    .filter((donation) => {
      if (filterCategory === 'All') return true;
      // This logic is still basic, a real app would have a category field
      return donation.foodType.toLowerCase().includes(filterCategory.toLowerCase());
    })
    .filter((donation) => {
      if (searchTerm === '') return true;
      return (
        donation.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const mapPosition = [18.5204, 73.8567]; // Default Pune coordinates

  return (
    <div id="available" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark dark:text-white">Available Donations</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300'}`}
          >
            <FaList size={20} />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300'}`}
          >
            <FaMapMarkerAlt size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
          type="text"
          placeholder="Search by food type, donor, or location..."
          className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              Filter by {category}
            </option>
          ))}
        </select>
      </div>
      
      {loading && <p className="p-4 text-center text-primary dark:text-accent-yellow">Fetching available food listings...</p>}
      
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {viewMode === 'list' && !loading && !error && (
        <div className="space-y-4">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg bg-light-bg dark:bg-dark-bg">
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-primary-dark dark:text-white">{item.foodType} ({item.quantity})</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">From: {item.donorName}</p>
                  <p className="text-sm text-accent-orange font-medium">Expires: {new Date(item.expiryTime).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => handleRequestFood(item)}
                  className="w-full md:w-auto px-6 py-2 rounded-full text-white bg-primary hover:bg-opacity-80 transition duration-300"
                >
                  Request Food
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">No donations match your filters.</p>
          )}
        </div>
      )}

      {viewMode === 'map' && !loading && !error && (
        <div className="h-[600px] w-full rounded-lg overflow-hidden z-0">
          <MapContainer center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredDonations.map((item) => (
              (item.latitude && item.longitude) ? (
                <Marker key={item._id} position={[item.latitude, item.longitude]}>
                  <Popup>
                    <div className="font-sans">
                      <h3 className="font-bold text-lg text-primary-dark">{item.foodType} ({item.quantity})</h3>
                      <p className="text-sm text-gray-600">From: {item.donorName}</p>
                      <p className="text-sm text-accent-orange font-medium">Expires: {new Date(item.expiryTime).toLocaleDateString()}</p>
                      <button 
                        onClick={() => handleRequestFood(item)}
                        className="mt-2 w-full px-4 py-2 text-sm rounded-full text-white bg-primary hover:bg-opacity-80"
                      >
                        Request
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default AvailableDonations;