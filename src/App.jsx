import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Requests from './pages/Requests';
const App = () => {
  return (
    <div className="w-full sm:max-w-[80%] mx-auto min-h-screen py-4">
      <div className="relative rounded-3xl border border-cyan-400/25 bg-slate-900/60 backdrop-blur-2xl shadow-neon overflow-hidden">
        {/* subtle animated glow orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl animate-pulse" />

        <Header />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-requests" element={<Requests />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
