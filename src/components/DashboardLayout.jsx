import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaTasks, FaUserCircle, FaSignOutAlt, FaHandHoldingHeart,
  FaBoxOpen, FaThList, FaPaperPlane, FaBuilding, FaBell 
} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle.jsx';
// NOTE: axios import is removed from this file, as it is only needed in the child components
import setAuthToken from '../utils/setAuthToken.js'; 

// --- Navigation Link Definitions ---
const donorNavLinks = [
  { name: 'Dashboard', href: '/dashboard/donor', icon: FaTachometerAlt },
  { name: 'Donate Food', href: '/dashboard/donor/donate', icon: FaBoxOpen },
  { name: 'Incoming Requests', href: '/dashboard/donor/donations', icon: FaTasks }, // Incoming Requests
  { name: 'Full History', href: '/dashboard/donor/history', icon: FaTasks }, // Full Posted History
  { name: 'Profile', href: '/dashboard/donor/profile', icon: FaUserCircle },
];

const receiverNavLinks = [
  { name: 'Dashboard', href: '/dashboard/receiver', icon: FaTachometerAlt },
  { name: 'Available', href: '/dashboard/receiver/available', icon: FaThList },
  { name: 'My Requests', href: '/dashboard/receiver/requests', icon: FaPaperPlane },
  { name: 'Profile', href: '/dashboard/receiver/profile', icon: FaBuilding },
];
// -----------------------------------

const DashboardLayout = ({ userRole }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Notification State (Still using localStorage mock)
  const [notifications, setNotifications] = useState([]);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const navLinks = userRole === 'donor' ? donorNavLinks : receiverNavLinks;

  // Function to load notifications (Using localStorage mock for now)
  const loadNotifications = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const myNotifications = allNotifications.filter(n => n.role === userRole);
    setNotifications(myNotifications);
    setHasUnread(myNotifications.some(n => !n.read));
  };

  useEffect(() => {
    loadNotifications();
  }, [userRole]);

  // Handle Bell Click
  const handleBellClick = () => {
    setIsNotifyOpen(!isNotifyOpen);
    
    // Mark notifications as read
    const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const myUpdatedNotifications = allNotifications.map(n => 
      n.role === userRole ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(myUpdatedNotifications));
    
    loadNotifications();
  };
  
  // Handle Logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear user session data
    setAuthToken(null); // Clears the token using the utility
  };


  return (
    <div className="flex min-h-screen">
      {/* --- Sidebar Navigation (fixed, hover-expandable) --- */}
      <nav 
        className={`fixed top-0 left-0 h-full bg-primary-dark text-white p-4 flex flex-col z-50
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-64' : 'w-20'}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-3 text-white mb-10 min-h-[40px]">
          <FaHandHoldingHeart size={32} className="flex-shrink-0" />
          <span className={`text-2xl font-bold ${!isSidebarOpen && 'opacity-0 scale-0'}`}>
            ServeWithCare
          </span>
        </Link>
        
        {/* Main Nav Links */}
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-primary 
                            transition-colors duration-200
                            ${location.pathname === link.href ? 'bg-primary' : ''}`}
              >
                <link.icon size={24} className="flex-shrink-0" />
                <span className={`transition-opacity ${!isSidebarOpen && 'opacity-0 scale-0'}`}>
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* --- BOTTOM SECTION: Theme, Notification, Logout (FIXED STRUCTURE) --- */}
        <div className="mt-auto pt-6 border-t border-gray-700 space-y-2">
          
          {/* 1. Theme Toggle */}
          
          {/* 2. Notification Bell */}
          <div className="relative">
            <button
              onClick={handleBellClick}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary transition-colors duration-200 w-full"
            >
              <FaBell size={24} className="flex-shrink-0" />
              <span className={`transition-opacity ${!isSidebarOpen && 'opacity-0 scale-0'}`}>
                Notifications
              </span>
              {hasUnread && (
                <span className="absolute top-2 left-5 w-3 h-3 bg-accent-orange rounded-full border-2 border-primary-dark"></span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {isNotifyOpen && (
              <div className="absolute bottom-16 left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 text-dark-text z-50">
                <div className="p-4 border-b">
                  <h3 className="font-bold">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.reverse().map((n) => (
                      <div key={n.id} className="p-4 border-b hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                        <p className="text-sm dark:text-text-dark">{n.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-gray-500">No new notifications.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* 3. Logout Button */}
          <Link
            to="/login"
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary transition-colors duration-200"
          >
            <FaSignOutAlt size={24} className="flex-shrink-0" />
            <span className={`transition-opacity ${!isSidebarOpen && 'opacity-0 scale-0'}`}>
              Logout
            </span>
          </Link>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      <main 
        className={`flex-1 p-10 bg-light-bg dark:bg-dark-bg overflow-y-auto 
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;