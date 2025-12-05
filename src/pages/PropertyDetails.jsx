import React, { useState } from 'react';


import { housesData } from '../data';

import { useParams, useNavigate } from 'react-router-dom';

import { BiBed, BiBath, BiArea, BiPhone } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const PropertyDetails = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const property = housesData.find((house) => {
    return house.id === parseInt(id);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    // Validate form fields
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim() || !formMessage.trim()) {
      setStatus('Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    if (!property) {
      setStatus('Property not found.');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // Require login before allowing message to be sent
    if (!currentUser || !currentUser.id) {
      setShowAuthModal(true);
      return;
    }

    const payload = {
      propertyId: property.id,
      propertyName: property.name,
      agentName: property.agent?.name || 'Unknown',
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      message: formMessage.trim(),
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    try {
      // Check if json-server is running
      const testRes = await fetch('http://localhost:3001/api/users').catch(() => null);
      if (!testRes || !testRes.ok) {
        setStatus('Error: JSON server is not running. Please run "npm run server" in a separate terminal.');
        return;
      }

      const res = await fetch('http://localhost:3001/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('JSON Server is not running. Please run "npm run server" in a separate terminal.');
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${res.status} ${res.statusText}`);
      }

      const savedRequest = await res.json();
      

      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      
      setStatus('✅ Message sent successfully! Your request has been saved.');
      

      setTimeout(() => {
        setStatus('');
      }, 5000);
    } catch (err) {
      console.error('Error details:', err);
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setStatus('❌ Error: Cannot connect to server. Make sure json-server is running (npm run server).');
      } else {
        setStatus(`❌ Error: ${err.message || 'Failed to send request. Please try again.'}`);
      }
    }
  };

  return (
    <div className="container mx-auto min-h-[800px] mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{property.name}</h2>
          <h3 className="text-lg mb-4">{property.address}</h3>
        </div>
        <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
          <div className="bg-green-500 rounded-full text-white px-3 inline-block">
            {property.type}
          </div>
          <div className="bg-violet-500 rounded-full text-white px-3 inline-block">
            {property.country}
          </div>
        </div>
        <div className="text-3xl font-semibold text-cyan-300">
          $ {property.price}
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="max-w-[768px]">
          <div className="mb-8">
            <img src={property.imageLg} alt="" />
          </div>
          <div className="flex gap-x-6 text-violet-700 mb-6">
            <div className="flex gap-x-2 items-center">
              <BiBed className="text-2xl" />
              <div className="text-lg font-medium">{property.bedrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiBath className="text-2xl" />
              <div className="text-lg font-medium">{property.bathrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiArea className="text-2xl" />
              <div className="text-lg font-medium">{property.surface}</div>
            </div>
          </div>
          <p>{property.description}</p>
        </div>
        <div className="flex-1 w-full mb-8 bg-slate-900/80 border border-cyan-400/30 rounded-2xl px-6 py-8 shadow-neon backdrop-blur-xl">
          <div className="flex items-center gap-x-4 mb-8">
            <div className="w-20 h-20 p-1 border border-cyan-300/40 rounded-full bg-slate-900/80">
              <img src={property.agent.image} alt={property.agent.name} className="rounded-full" />
            </div>
            <div>
              <div className="font-bold text-lg text-slate-50">{property.agent.name}</div>
              <Link to="" className="text-cyan-300 text-sm hover:text-cyan-200 transition">
                View listings
              </Link>
            </div>
          </div>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <input
              className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-14 text-sm outline-none transition"
              type="text"
              placeholder="Name*"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
            <input
              className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-14 text-sm outline-none transition"
              type="text"
              placeholder="Email*"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
            <input
              className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-14 text-sm outline-none transition"
              type="text"
              placeholder="Phone*"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              required
            />
            <textarea
              className="border border-cyan-400/40 focus:border-cyan-300 rounded-2xl w-full p-4 h-36 text-sm text-slate-50 placeholder-slate-400 bg-slate-900/70 outline-none resize-none transition"
              type="text"
              placeholder="Message*"
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
            />
            <div className="flex gap-x-2">
              <button
                className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium rounded-xl p-4 text-sm w-full transition shadow-neon"
                type="submit"
              >
                Send message
              </button>
              <button 
                type="button"
                onClick={() => {
                  // Check if user has filled in phone number in the form
                  if (formPhone && formPhone.trim() !== '') {
                    // Clean phone number: remove spaces, dashes, parentheses, and keep only digits and +
                    const cleanedPhone = formPhone.replace(/[\s\-\(\)\.]/g, '');
                    
                    // Verify cleaned phone has at least some digits
                    if (cleanedPhone.length > 0 && /[\d+]/.test(cleanedPhone)) {
                      // Initiate call with the cleaned phone number
                      window.location.href = `tel:${cleanedPhone}`;
                      setStatus('✅ Call initiated successfully!');
                      setTimeout(() => {
                        setStatus('');
                      }, 3000);
                    } else {
                      setStatus('❌ Invalid phone number format');
                      setTimeout(() => setStatus(''), 3000);
                    }
                  } else {
                    setStatus('❌ Call is not initiated');
                    setTimeout(() => {
                      setStatus('');
                    }, 3000);
                  }
                }}
                className="border border-cyan-400/70 text-cyan-300 hover:border-cyan-300 hover:text-cyan-200 rounded-xl p-4 text-sm w-full transition bg-slate-900/60"
              >
                Call
              </button>
            </div>
          </form>
          {status && (
            <p className={`mt-4 text-sm ${
              status.includes('✅') || status.includes('successfully')
                ? 'text-green-600 font-semibold'
                : 'text-red-600 font-semibold'
            }`}>
              {status}
            </p>
          )}
        </div>
      </div>

      {/* Auth required modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm bg-slate-900/90 border border-cyan-400/40 rounded-2xl px-6 py-8 shadow-neon backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-2 text-slate-50 text-center">
              Login required
            </h3>
            <p className="text-sm text-slate-300/90 mb-6 text-center">
              Please login or sign up to send a message to the house owner and
              track your requests in your dashboard.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium rounded-xl px-4 py-2 text-sm w-full transition shadow-neon"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="border border-cyan-400/70 text-cyan-300 hover:border-cyan-300 hover:text-cyan-200 rounded-xl px-4 py-2 text-sm w-full transition bg-slate-900/60"
              >
                Create an Account
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-xs text-slate-400 hover:text-slate-200 mt-1"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
