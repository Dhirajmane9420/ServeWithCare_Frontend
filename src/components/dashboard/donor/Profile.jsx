import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', contact: '', address: '' });
  const [formData, setFormData] = useState({ name: '', contact: '', address: '' });

  // --- FIX: Use a direct string constant for stability ---
  const API_URL = 'http://localhost:5000'; 

  // Load user data from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/me`);
        const userData = {
          ...res.data,
          contact: res.data.contact || '',
          address: res.data.address || ''
        };
        setUser(userData);
        setFormData(userData);
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };
    loadUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save user data to API
  const handleSave = async () => {
    try {
      const updateData = {
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
      };

      // CRITICAL FIX: PUT request uses the direct API_URL
      const res = await axios.put(`${API_URL}/api/users/profile`, updateData);
      
      setUser(res.data);
      setFormData(res.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
      
      // Update the cache so other components (like Dashboard header) see the new name instantly
      sessionStorage.setItem('loggedInUser', JSON.stringify(res.data));

    } catch (err) {
      console.error('Failed to save profile:', err.response ? err.response.data : err);
      alert('Failed to save profile. Check server logs.');
    }
  };

  // ... (rest of the return JSX) ...
  return (
    <div id="profile" className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-primary-dark dark:text-white mb-6">Donor Profile</h2>
      
      {isEditing ? (
        /* --- EDITING VIEW (FORM) --- */
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-text-light">Name</label>
            <input
              type="text" name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-text-light">Contact Number</label>
            <input
              type="text" name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-text-light">Address</label>
            <input
              type="text" name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex space-x-4 mt-6">
            <button onClick={handleSave} className="px-6 py-2 rounded-full text-white bg-primary hover:bg-opacity-80 transition duration-300">
              Save Changes
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData(user); // Reset changes
              }}
              className="px-6 py-2 rounded-full text-text-dark dark:text-text-light bg-gray-200 dark:bg-gray-500 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* --- DISPLAY VIEW (STATIC) --- */
        <div className="space-y-4">
          <p className="text-text-dark dark:text-text-light"><strong>Name:</strong> {user.name}</p>
          <p className="text-text-dark dark:text-text-light"><strong>Email:</strong> {user.email}</p>
          <p className="text-text-dark dark:text-text-light"><strong>Contact Number:</strong> {user.contact || 'Not set'}</p>
          <p className="text-text-dark dark:text-text-light"><strong>Address:</strong> {user.address || 'Not set'}</p>
          
          <button 
            onClick={() => setIsEditing(true)}
            className="mt-4 px-5 py-2 rounded-full text-primary border border-primary hover:bg-primary hover:text-white transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;