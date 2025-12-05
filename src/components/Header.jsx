import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);

    // Listen for storage changes (when user logs in from another tab/window)
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      setCurrentUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event when login happens in same tab
    window.addEventListener('userLogin', handleStorageChange);
    window.addEventListener('userLogout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  return (
    <header className="py-4 mb-8 border-b border-cyan-400/20 bg-slate-900/40 backdrop-blur-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-500 shadow-neon flex items-center justify-center text-slate-950 font-extrabold text-lg">
            DH
          </div>
          <h2 className="font-semibold text-2xl tracking-tight text-slate-50">
            Dream
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              House
            </span>
          </h2>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            className="hover:text-cyan-300 transition font-medium text-slate-100"
            to="/"
          >
            Home
          </Link>
          {currentUser ? (
            <>
              <Link
                className="hidden sm:block hover:text-cyan-300 transition font-medium text-slate-100"
                to="/my-requests"
              >
                My Requests
              </Link>
              <Link
                className="hidden sm:block hover:text-cyan-300 transition font-medium text-slate-100"
                to="/profile"
              >
                Profile
              </Link>
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-slate-200/80">Welcome,</span>
                <Link
                  to="/profile"
                  className="font-semibold text-cyan-300 hover:text-cyan-200 transition"
                >
                  {currentUser.name}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="bg-slate-900/70 hover:bg-slate-800 text-slate-50 px-4 py-2 rounded-xl border border-slate-600 hover:border-cyan-400/70 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="hidden sm:block hover:text-cyan-300 transition text-slate-100"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 px-4 py-2 rounded-xl transition shadow-neon"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
