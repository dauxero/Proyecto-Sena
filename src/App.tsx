import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { getToken, setToken, removeToken } from './services/authService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUserRole(localStorage.getItem('userRole'));
    }
  }, []);

  const handleLogin = (token: string, role: string) => {
    setToken(token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
    toast.success('Logged in successfully!');
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    toast.info('Logged out successfully');
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard/*" element={
          isAuthenticated ? <Dashboard role={userRole} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
