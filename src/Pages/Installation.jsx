import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('high-low'); // 'high-low' or 'low-high'
  const [toast, setToast] = useState({ visible: false, message: '' });
  const navigate = useNavigate();

  // Helper to format download count
  const formatDownloads = (downloads) => {
    if (downloads >= 1_000_000) {
      return (downloads / 1_000_000).toFixed(1) + 'M';
    }
    if (downloads >= 1_000) {
      return (downloads / 1_000).toFixed(0) + 'K';
    }
    return downloads.toString();
  };

  // Helper to format rating
  const formatRating = (rating) => rating.toFixed(1);

  // Load all apps from JSON
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/JSON/api.json');
        if (!response.ok) throw new Error('Failed to fetch apps');
        const data = await response.json();
        setAllApps(data);
      } catch (err) {
        console.error('Error loading apps:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // Load installed apps from localStorage and update installedApps list
  useEffect(() => {
    if (allApps.length === 0) return;
    const storedIds = JSON.parse(localStorage.getItem('installedApps') || '[]');
    const installed = allApps.filter((app) => storedIds.includes(app.id));
    setInstalledApps(installed);
  }, [allApps]);

  // Sort installed apps based on selected option
  const sortedApps = [...installedApps].sort((a, b) => {
    if (sortOption === 'high-low') {
      return b.downloads - a.downloads;
    } else {
      return a.downloads - b.downloads;
    }
  });

  // Uninstall handler
  const handleUninstall = (appId, appTitle) => {
    // Remove from localStorage
    const storedIds = JSON.parse(localStorage.getItem('installedApps') || '[]');
    const updatedIds = storedIds.filter((id) => id !== appId);
    localStorage.setItem('installedApps', JSON.stringify(updatedIds));

    // Update state
    setInstalledApps((prev) => prev.filter((app) => app.id !== appId));

    // Show toast
    setToast({ visible: true, message: `${appTitle} has been uninstalled.` });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading your installed apps...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Installation</h1>
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort by downloads:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632EE3]"
            >
              <option value="high-low">High → Low</option>
              <option value="low-high">Low → High</option>
            </select>
          </div>
        </div>

        {/* No installed apps message */}
        {sortedApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't installed any apps yet.</p>
            <button
              onClick={() => navigate('/apps')}
              className="mt-4 px-6 py-2 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg hover:shadow-lg transition"
            >
              Browse Apps
            </button>
          </div>
        ) : (
          // Apps grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Clickable image area (navigate to details) */}
                <div
                  onClick={() => navigate(`/app/${app.id}`)}
                  className="h-48 overflow-hidden cursor-pointer"
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {app.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#00d390] bg-[#F1F5E8] p-1 rounded font-medium">
                      <i className="fa-solid fa-download" style={{ color: '#00d390' }}></i>{' '}
                      {formatDownloads(app.downloads)}
                    </span>
                    <span className="text-xs bg-[#FFF0E1] p-1 rounded text-[#FF6B35] font-medium">
                      ★ {formatRating(app.ratingAvg)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleUninstall(app.id, app.title)}
                    className="mt-4 w-full py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Uninstall
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-trash-alt"></i>
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;