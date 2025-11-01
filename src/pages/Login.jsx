import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHandHoldingHeart } from 'react-icons/fa';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken.js'; // <-- IMPORTANT IMPORT

const Login = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Use one consistent API_URL (hardcoded for stability)
  const API_URL = 'http://localhost:5000';
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Use the API_URL defined above
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      // 1. Save token and user data to session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      sessionStorage.setItem('userRole', user.role); 
      
      // 2. CRUCIAL: Set token globally for all future axios requests
      setAuthToken(token); 
      
      // 3. Navigate based on the role from the API response
      if (user.role === 'donor') {
        navigate('/dashboard/donor');
      } else if (user.role === 'receiver') {
        navigate('/dashboard/receiver');
      } else {
        navigate('/');
      }

    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.msg); // e.g., "Invalid credentials"
      } else {
        alert("An error occurred. Please check server status.");
      }
    }
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Form Side */}
      <div className="flex flex-1 flex-col justify-center items-center p-8 md:p-12 w-full md:w-1/2">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-4xl font-bold font-serif text-primary-dark dark:text-white">
              Welcome Back!
            </h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              Sign in to continue your impact.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            
            <div className="rounded-md shadow-sm space-y-4">
              <input
                id="email-address" name="email" type="email" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password" name="password" type="password" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-primary hover:bg-opacity-80 transition duration-300"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-center dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-opacity-80">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Design Side */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-primary text-white p-12 text-center">
        <FaHandHoldingHeart size={80} />
        <h1 className="text-4xl font-bold font-serif mt-6">
          ServeWithCare
        </h1>
        <p className="text-xl mt-4">
          "The best way to find yourself is to lose yourself in the service of others."
        </p>
      </div>
    </div>
  );
};

export default Login;