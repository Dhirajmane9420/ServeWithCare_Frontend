import { useState } from 'react';
import axios from 'axios';

const DonateFoodForm = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [latitude, setLatitude] = useState('18.5204');
  const [longitude, setLongitude] = useState('73.8567');

  // TEMPORARY FIX: Use direct URL to bypass failing ENV system
  const API_URL = 'http://localhost:5000'; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodType || !quantity || !location || !expiryTime) {
      return alert('Please fill out all required fields');
    }

    // This is correct and sends the right data keys:
const newDonation = {
    foodType,
    quantity,
    location,
    expiryTime: expiryTime, 
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
};

    try {
      const userRole = sessionStorage.getItem('userRole');
      if (userRole !== 'donor') {
        return alert('You must be logged in as a donor to post a donation.');
      }
      
      const res = await axios.post(`${API_URL}/api/donations`, newDonation); 

      console.log('Donation created:', res.data);
      alert('Donation posted successfully! Check your email for confirmation.');

      setFoodType('');
      setQuantity('');
      setLocation('');
      setExpiryTime('');

    } catch (err) {
      console.error('Error creating donation:', err.response ? err.response.data : err);
      
      if (err.response && err.response.status === 401) {
        alert('Unauthorized. Please log out and log back in.');
      } else if (err.response && err.response.status === 400) {
         alert('Failed to post donation. Check that the Expiry Time is set to a future date and all fields are complete.');
      } else {
        alert('Failed to post donation. Check server status.');
      }
    }
  };

  return (
    <div id="donate" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">Donate Food</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Food Type (e.g., Vegetables)" 
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Quantity (e.g., 10 kg)" 
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Pickup Location" 
          className="p-3 border border-gray-300 rounded-md md:col-span-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input 
          type="number" 
          placeholder="Latitude (e.g., 18.5204)" 
          step="any"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Longitude (e.g., 73.8567)" 
          step="any"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Expiry Time</label>
          <input 
            type="datetime-local" 
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Upload Photo (Optional)</label>
          <input type="file" className="p-2 border border-gray-300 rounded-md w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        </div>

        <button
          type="submit"
          className="md:col-span-2 w-full py-3 px-4 rounded-full text-white text-lg font-medium bg-accent-orange hover:bg-opacity-80 transition duration-300"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonateFoodForm;