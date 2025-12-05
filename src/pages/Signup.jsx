import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../utils/jsonServerApi';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate form fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    // Call signupUser function from jsonServerApi
    const result = await signupUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });

    if (result.success) {
      // Do NOT log the user in automatically.
      // Just confirm account creation and ask them to log in manually.
      setMessage('Account created successfully. Please login with these details.');
    } else {
      setMessage(result.error || 'Error signing up');
    }
  };

  return (
    <div className="container mx-auto min-h-[600px] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/80 border border-cyan-400/30 rounded-2xl px-8 py-10 shadow-neon backdrop-blur-xl">
        <h2 className="text-2xl font-semibold mb-2 text-center text-slate-50">Sign Up</h2>
        <p className="text-xs text-center mb-6 text-slate-300/80">
          Create your account to save and track all your dream house requests.
        </p>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <input
            className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
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
            autoComplete="new-password"
            required
          />
          <button
            className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium rounded-xl p-3 text-sm w-full transition mt-2 shadow-neon"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-slate-200 space-y-2">
            <p>{message}</p>
            {message.toLowerCase().includes('account created') && (
              <div className="mt-2 text-xs text-slate-300/90 border border-cyan-400/30 rounded-xl px-3 py-2 inline-block text-left">
                <p>
                  <span className="font-semibold">Name:</span> {name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="mt-3 w-full bg-slate-900/70 hover:bg-slate-800 border border-cyan-400/60 text-cyan-200 rounded-lg py-1.5 text-xs transition"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;


