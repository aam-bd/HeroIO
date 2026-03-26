import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import errphoto from '../assets/error-404.png';

const Apps = () => {
  const [allApps, setAllApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const formatDownloads = (downloads) => {
    if (downloads >= 1_000_000) {
      return (downloads / 1_000_000).toFixed(1) + 'M';
    }
    if (downloads >= 1_000) {
      return (downloads / 1_000).toFixed(0) + 'K';
    }
    return downloads.toString();
  };

  
  const formatRating = (rating) => rating.toFixed(1);

  
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/JSON/api.json');
        if (!response.ok) {
          throw new Error('Failed to fetch app data');
        }
        const data = await response.json();
        setAllApps(data);
        setFilteredApps(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApps(allApps);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = allApps.filter(app =>
        app.title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredApps(filtered);
    }
  }, [searchTerm, allApps]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">Loading apps...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inter mb-4">
            All Apps
          </h2>
          <p className="text-[#627382] inter max-w-2xl mx-auto">
            Discover our complete collection of innovative apps designed to simplify and enhance your digital life.
          </p>
        </div>

        {/* Total apps and search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredApps.length}</span> apps found
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search apps by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632EE3] focus:border-transparent"
            />
          </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? (
          <div className="flex justify-center py-12">
            <img src={errphoto} alt="No App Found" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => navigate(`/app/${app.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Card content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {app.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#00d390] bg-[#F1F5E8] p-1 rounded font-medium">
                      <i className="fa-solid fa-download" style={{ color: '#00d390' }}></i> {formatDownloads(app.downloads)}
                    </span>
                    <span className="text-xs bg-[#FFF0E1] p-1 rounded text-[#FF6B35] font-medium">
                      ★ {formatRating(app.ratingAvg)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;