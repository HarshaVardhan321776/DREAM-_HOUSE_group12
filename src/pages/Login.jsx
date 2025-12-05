import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/jsonServerApi';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate form fields
    if (!email.trim() || !password.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    // Call loginUser function from jsonServerApi
    const result = await loginUser({
      email: email.trim(),
      password: password.trim(),
    });

    if (result.success) {
      setMessage('Logged in successfully');
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      
      // Trigger event to update header
      window.dispatchEvent(new Event('userLogin'));

      // redirect to home after successful login
      navigate('/');
    } else {
      setMessage(result.error || 'Error logging in');
    }
  };

  return (
    <div className="container mx-auto min-h-[600px] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/80 border border-cyan-400/30 rounded-2xl px-8 py-10 shadow-neon backdrop-blur-xl">
        <h2 className="text-2xl font-semibold mb-2 text-center text-slate-50">Login</h2>
        <p className="text-xs text-center mb-6 text-slate-300/80">
          Sign in to continue exploring and contacting your dream houses.
        </p>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <input
            className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium rounded-xl p-3 text-sm w-full transition mt-2 shadow-neon"
            type="submit"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-slate-200">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;


