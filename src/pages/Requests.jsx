import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequestsByUserId } from '../utils/jsonServerApi';

const Requests = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    setCurrentUser(user);

    const fetchRequests = async () => {
      setLoading(true);
      const result = await getRequestsByUserId(user.id);

      if (result.success) {
        setRequests(result.requests);
        if (!result.requests.length) {
          setMessage('You have not contacted any house owners yet.');
        } else {
          setMessage('');
        }
      } else {
        setMessage(result.error || 'Failed to load your requests.');
      }

      setLoading(false);
    };

    fetchRequests();
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className="container mx-auto min-h-[600px] flex items-center justify-center">
        <p className="text-slate-200">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[600px] mb-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-slate-50">
          My Contact Requests
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-slate-200/80">Loading your requests...</p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-cyan-400/30 rounded-2xl p-6 shadow-neon backdrop-blur-xl">
            {message && (
              <p className="mb-4 text-sm text-slate-200 text-center">
                {message}
              </p>
            )}

            {requests.length > 0 && (
              <div className="space-y-4">
                {requests
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((req) => (
                    <div
                      key={req.id}
                      className="border border-cyan-400/25 rounded-2xl p-5 hover:border-cyan-300/70 hover:shadow-neon transition bg-slate-900/70"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm text-slate-300/80">
                            Contacted owner of
                          </p>
                          <p className="font-semibold text-slate-50 text-lg">
                            {req.propertyName || 'Unknown property'}
                          </p>
                          {req.agentName && (
                            <p className="text-xs text-slate-300/80">
                              Agent: {req.agentName}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-300/80">
                            Sent on
                          </p>
                          <p className="text-sm text-slate-100">
                            {req.createdAt
                              ? new Date(req.createdAt).toLocaleString()
                              : 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-xs text-slate-300/80 mb-1">
                          Your message
                        </p>
                        <div className="bg-slate-900/80 border border-cyan-400/30 rounded-xl p-3 text-sm text-slate-50 whitespace-pre-wrap">
                          {req.message}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300/80">
                        <div>
                          <span className="font-medium">Name: </span>
                          {req.name}
                        </div>
                        <div>
                          <span className="font-medium">Email: </span>
                          {req.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone: </span>
                          {req.phone}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;


