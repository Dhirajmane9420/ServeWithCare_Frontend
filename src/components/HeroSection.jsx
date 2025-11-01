 import heroBg from '../assets/image.png'; // Uncomment when you have an image
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // Style for the background image
  const heroStyle = {
    backgroundImage: `url(${heroBg})` // Uncomment this
  };

  return (
    <div 
      className="h-[90vh] flex items-center justify-center bg-primary bg-cover bg-center" 
      style={heroStyle}
    >
      {/* Overlay to make text readable */}
      <div className="absolute top-0 left-0 w-full h-[90vh] bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">
          Donate Food, Spread Happiness.
        </h1>
        <p 
          className="text-xl md:text-2xl mb-8 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.2s' }} // NEW: Add delay
        >
          Join our mission to reduce food waste and help those in need.
        </p>
        <Link 
          to="/signup" 
          className="inline-block bg-accent-orange text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-opacity-80 transition duration-300 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;