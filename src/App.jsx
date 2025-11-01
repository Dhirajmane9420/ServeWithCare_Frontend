import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Impact from './pages/Impact.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import FAQ from './pages/FAQ.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

// Donor Components
import DonorDashboard from './pages/DonorDashboard.jsx';
import DonateFoodForm from './components/dashboard/donor/DonateFoodForm.jsx';
import MyDonations from './components/dashboard/donor/MyDonations.jsx';
import DonationHistoryList from "./components/dashboard/donor/DonationHistoryList.jsx"; 
import ProfileSection from './components/dashboard/donor/Profile.jsx';

// Receiver Components
import ReceiverDashboard from './pages/ReceiverDashboard.jsx';
import AvailableDonations from './components/dashboard/receiver/AvailableDonations.jsx';
import MyRequests from './components/dashboard/receiver/MyRequests.jsx';
import ReceiverProfile from './components/dashboard/receiver/Profile.jsx';

import ChatPage from './pages/ChatPage.jsx';
import setAuthToken from './utils/setAuthToken.js'; // <-- IMPORT

// --- CRITICAL FIX: Initialize Token on App Load ---
const token = sessionStorage.getItem('token'); // <-- Read from sessionStorage
if (token) {
  setAuthToken(token); // Set the global axios header
}
// ----------------------------------------------------

const AppLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/chat');
  const userRole = sessionStorage.getItem('userRole'); // Read from sessionStorage

  return (
    <>
      {!isDashboard && <Navbar />}
      
      <main className={!isDashboard ? 'pt-20' : ''}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* --- DASHBOARD ROUTES (Wrapped in PrivateRoute) --- */}
          
          {/* Donor Routes */}
          <Route element={<PrivateRoute allowedRole="donor" />}>
            <Route path="/dashboard/donor" element={<DashboardLayout userRole="donor" />}>
              <Route index element={<DonorDashboard />} />
              <Route path="donate" element={<DonateFoodForm />} />
              <Route path="donations" element={<MyDonations />} />
              <Route path="history" element={<DonationHistoryList />} />
              <Route path="profile" element={<ProfileSection />} />
            </Route>
          </Route>

          {/* Receiver Routes */}
          <Route element={<PrivateRoute allowedRole="receiver" />}>
            <Route path="/dashboard/receiver" element={<DashboardLayout userRole="receiver" />}>
              <Route index element={<ReceiverDashboard />} />
              <Route path="available" element={<AvailableDonations />} />
              <Route path="requests" element={<MyRequests />} />
              <Route path="profile" element={<ReceiverProfile />} />
            </Route>
          </Route>
          
          {/* CHAT ROUTE */}
          <Route element={<PrivateRoute />}> 
            <Route path="/chat/:requestId" element={<DashboardLayout userRole={userRole} />}>
              <Route index element={<ChatPage />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Home />} /> 

        </Routes>
      </main>
      
      {!isDashboard && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;