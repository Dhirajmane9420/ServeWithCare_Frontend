import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // <-- 1. IMPORT HASHLINK
import { FaHandHoldingHeart } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark-bg-secondary shadow-md z-50 transition-colors">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <FaHandHoldingHeart />
          <span>ServeWithCare</span>
        </Link>

        {/* --- 2. UPDATED LINKS --- */}
        <div className="hidden md:flex space-x-6 dark:text-text-light">
          {/* Use HashLink for smooth scrolling to IDs */}
          <HashLink smooth to="/#about-us" className="hover:text-primary">About Us</HashLink>
          <HashLink smooth to="/#how-it-works" className="hover:text-primary">How It Works</HashLink>
          
          {/* Standard Link for the separate Impact page */}
          <Link to="/impact" className="hover:text-primary">Our Impact</Link> 
          
          {/* HashLink for the footer Contact section */}
          <HashLink smooth to="/#contact" className="hover:text-primary">Contact</HashLink>
        </div>

        {/* Auth Buttons & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link 
            to="/login" 
            className="px-5 py-2 rounded-full text-primary border border-primary hover:bg-primary hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-5 py-2 rounded-full bg-accent-orange text-white hover:bg-opacity-80 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;