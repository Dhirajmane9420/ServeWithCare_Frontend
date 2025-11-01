// components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRole }) => {
  // ✅ Use localStorage to match App.jsx & Login.jsx
  const isAuthenticated = sessionStorage.getItem('token');
  
  // CRITICAL: Ensure we get the role as a string
  const userRole = sessionStorage.getItem('userRole');

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Logged in, but wrong role → redirect to their own dashboard
    const redirectPath = userRole ? `/dashboard/${userRole}` : '/';
    console.log(`[AUTH FAIL] User role (${userRole}) restricted from ${allowedRole}. Redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  // ✅ Authenticated + correct role → render requested route
  return <Outlet />;
};

export default PrivateRoute;
