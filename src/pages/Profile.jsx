import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, getUserById, deleteRequestsByUserId } from '../utils/jsonServerApi';

const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    setCurrentUser(user);
    setName(user.name || '');
    setEmail(user.email || '');

    // Fetch latest user data from server
    const fetchUser = async () => {
      const result = await getUserById(user.id);
      if (result.success) {
        setCurrentUser(result.user);
        setName(result.user.name || '');
        setEmail(result.user.email || '');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate password if provided
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password && password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const updateData = {
      name: name.trim(),
      email: email.trim(),
    };

    // Only include password if it's being changed
    if (password) {
      updateData.password = password;
    }

    const result = await updateUser(currentUser.id, updateData);

    if (result.success) {
      setMessage('Profile updated successfully!');
      setCurrentUser(result.user);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      window.dispatchEvent(new Event('userLogin')); // Update header
      setPassword('');
      setConfirmPassword('');
      setIsEditing(false);
    } else {
      setMessage(result.error || 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    // First, try to delete all contact requests made by this user
    await deleteRequestsByUserId(currentUser.id);

    // Then delete the user account itself
    const result = await deleteUser(currentUser.id);

    // Regardless of backend result, always log the user out locally
    if (!result.success) {
      setMessage(result.error || 'Failed to delete account on server, but you have been logged out locally.');
    }

    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('userLogout'));
    setShowDeleteConfirm(false);
    setLoading(false);
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[600px] mb-14">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-slate-50">
          My Profile
        </h2>

        <div className="bg-slate-900/80 border border-cyan-400/30 rounded-2xl px-8 py-10 shadow-neon backdrop-blur-xl">
          {!isEditing ? (
            <>
              {/* View Mode */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Name
                  </label>
                  <p className="text-lg text-slate-50">{currentUser.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email
                  </label>
                  <p className="text-lg text-slate-50">{currentUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Member Since
                  </label>
                  <p className="text-lg text-slate-50">
                    {currentUser.createdAt
                      ? new Date(currentUser.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium px-6 py-2 rounded-xl transition flex-1 shadow-neon"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition flex-1"
                >
                  Delete Account
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Name *
                  </label>
                  <input
                    className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email *
                  </label>
                  <input
                    className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                {password && (
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      className="border border-cyan-400/40 focus:border-cyan-300 bg-slate-900/70 text-slate-50 placeholder-slate-400 rounded-xl w-full px-4 h-12 text-sm outline-none transition"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required={!!password}
                    />
                  </div>
                )}

                {message && (
                  <p
                    className={`text-sm ${
                      message.includes('successfully')
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {message}
                  </p>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-medium px-6 py-2 rounded-xl transition flex-1 disabled:opacity-50 shadow-neon"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(currentUser.name);
                      setEmail(currentUser.email);
                      setPassword('');
                      setConfirmPassword('');
                      setMessage('');
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl transition flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-900/90 border border-cyan-400/40 rounded-2xl p-8 max-w-md mx-4 shadow-neon backdrop-blur-2xl">
              <h3 className="text-xl font-semibold mb-4 text-slate-50">
                Delete Account
              </h3>
              <p className="text-slate-200 mb-6 text-sm leading-relaxed">
                Are you sure you want to delete your account? This action cannot
                be undone. All your data will be permanently removed.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition flex-1 disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setLoading(false);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-50 px-6 py-2 rounded-xl transition flex-1 border border-slate-500/60"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

