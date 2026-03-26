import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Trending = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper to format download count (e.g., 5000 -> 5K, 2500000 -> 2.5M)
  const formatDownloads = (downloads) => {
    if (downloads >= 1_000_000) {
      return (downloads / 1_000_000).toFixed(1) + 'M';
    }
    if (downloads >= 1_000) {
      return (downloads / 1_000).toFixed(0) + 'K';
    }
    return downloads.toString();
  };

  // Helper to format rating (one decimal)
  const formatRating = (rating) => rating.toFixed(1);

  // Compute trending score based on downloads, reviews, and rating
  // Higher weight for downloads and rating, reviews also contribute
  const computeTrendingScore = (app) => {
    // Downloads: higher is better, but we use log scale to avoid huge numbers dominating
    // Rating: max 5, reviews: adds some weight for user engagement
    const downloadWeight = Math.log10(app.downloads + 1) * 2; // log scale
    const ratingWeight = app.ratingAvg * 0.8;
    const reviewWeight = Math.log10(app.reviews + 1) * 0.5;
    return downloadWeight + ratingWeight + reviewWeight;
  };

  useEffect(() => {
    const fetchApps = async () => {
      try {
        // Fetch the JSON data from the local file
        const response = await fetch('../../public/JSON/api.json');
        if (!response.ok) {
          throw new Error('Failed to fetch app data');
        }
        const data = await response.json();

        // Compute trending score for each app and sort descending
        const appsWithScore = data.map(app => ({
          ...app,
          trendingScore: computeTrendingScore(app)
        }));
        const sortedApps = appsWithScore.sort((a, b) => b.trendingScore - a.trendingScore);
        const topApps = sortedApps.slice(0, 8); // Take top 8

        setApps(topApps);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">Loading trending apps...</div>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 inter mb-6">
          Trending Apps
        </h2>
        <p className='text-center text-[#627382] mt-6 mb-12 inter'>
            Explore All Trending Apps on the Market developed by us
        </p>

        {/* Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate(`/app/${app.id}`)} // Navigate to details page
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
                    <i class="fa-solid fa-download" style={{ color: '#00d390' }}></i> {formatDownloads(app.downloads)}
                  </span>
                  <span className="text-xs bg-[#FFF0E1] p-1 rounded text-[#FF6B35] font-medium">
                    ★ {formatRating(app.ratingAvg)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/apps')} // Adjust route to your All Apps page
            className="px-6 py-3 bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Show All Apps
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;