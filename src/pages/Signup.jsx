import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHandHoldingHeart, FaBuilding } from 'react-icons/fa';
import axios from 'axios'; // <-- 1. Import axios

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('donor');
  const navigate = useNavigate();

  // --- 2. UPDATED handleSignup FUNCTION ---
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 3. Create the new user object
    const newUser = {
      name,
      email,
      password,
      role,
    };

    try {
      // 4. Send the data to your backend API
      const res = await axios.post('http://localhost:5000/api/auth/signup', newUser);

      console.log(res.data.msg); // "User registered successfully"
      alert("Account created successfully! Please log in.");
      navigate('/login');

    } catch (err) {
      // 5. Handle errors from the backend
      if (err.response && err.response.data) {
        alert(err.response.data.msg); // e.g., "User already exists"
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    // ... (Your beautiful JSX form remains exactly the same) ...
    <div className="flex min-h-screen">
      {/* --- Form Side --- */}
      <div className="flex flex-1 flex-col justify-center items-center p-8 md:p-12 w-full md:w-1/2">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-4xl font-bold font-serif text-primary-dark dark:text-white">
              Create Your Account
            </h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              Join our mission to reduce food waste.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`flex flex-col items-center p-4 border-2 rounded-lg ${
                  role === 'donor' ? 'border-primary bg-primary/10' : 'border-gray-300'
                } transition-colors duration-200`}
              >
                <FaHandHoldingHeart size={30} className={role === 'donor' ? 'text-primary' : 'text-gray-500'} />
                <span className="font-medium mt-2">Donor 🥗</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('receiver')}
                className={`flex flex-col items-center p-4 border-2 rounded-lg ${
                  role === 'receiver' ? 'border-primary bg-primary/10' : 'border-gray-300'
                } transition-colors duration-200`}
              >
                <FaBuilding size={30} className={role === 'receiver' ? 'text-primary' : 'text-gray-500'} />
                <span className="font-medium mt-2">Receiver 🍽️</span>
              </button>
            </div>

            <input 
              name="name" type="text" required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              name="email" type="email" required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              name="password" type="password" required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input 
              name="confirmPassword" type="password" required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg-secondary dark:border-gray-600 dark:text-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-primary hover:bg-opacity-80 transition duration-300"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="mt-6 text-center dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-opacity-80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* --- Design Side --- */}
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

export default Signup;