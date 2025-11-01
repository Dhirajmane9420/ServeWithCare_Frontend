import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // <-- CRITICAL FIX: Ensure this line is present
import { FaHandHoldingHeart, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary-dark text-light-bg pt-16 pb-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Brand & Socials */}
        <div>
          <Link to="/" className="flex items-center space-x-2 text-3xl font-bold text-white mb-4">
            <FaHandHoldingHeart />
            <span>ServeWithCare</span>
          </Link>
          <p className="mb-4 text-gray-300">Reducing food waste, helping those in need.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FaInstagram size={24} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
          <ul>
            {/* USE HASHLINK FOR ON-PAGE SCROLLING */}
            <li className="mb-2"><HashLink smooth to="/#about-us" className="text-gray-300 hover:text-white">About Us</HashLink></li>
            <li className="mb-2"><HashLink smooth to="/#how-it-works" className="text-gray-300 hover:text-white">How It Works</HashLink></li>
            
            {/* THESE LINKS ARE CORRECT (they go to new pages) */}
            <li className="mb-2"><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
            <li className="mb-2"><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
          <p className="mb-2 text-gray-300">contact@ServeWithCare.com</p>
          <p className="mb-2 text-gray-300">+1 (234) 567-890</p>
          <p className="text-gray-300">123 Charity Lane, Hope City</p>
        </div>

      </div>
      <div className="text-center text-gray-400 mt-12 border-t border-gray-700 pt-6">
        <p>&copy; 2025 ServeWithCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;