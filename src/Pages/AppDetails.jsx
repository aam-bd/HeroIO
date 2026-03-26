import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  
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
    const fetchApp = async () => {
      try {
        const response = await fetch('/JSON/api.json');
        if (!response.ok) {
          throw new Error('Failed to fetch app data');
        }
        const data = await response.json();
        const foundApp = data.find((app) => app.id === parseInt(id));
        if (!foundApp) {
          throw new Error('App not found');
        }
        setApp(foundApp);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  useEffect(() => {
    if (app) {
      const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
      setInstalled(installedApps.includes(app.id));
    }
  }, [app]);

  
  const handleInstall = () => {
    
    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
    
    if (!installedApps.includes(app.id)) {
      installedApps.push(app.id);
      localStorage.setItem('installedApps', JSON.stringify(installedApps));
    }
    setInstalled(true);
    setToastVisible(true);
    
    setTimeout(() => setToastVisible(false), 3000);
  };

  
  const chartData = app?.ratings.map((item) => ({
    name: item.name,
    count: item.count,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading app details...</div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error || 'App not found'}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <button
          onClick={() => navigate('/apps')}
          className="mb-6 text-[#632EE3] hover:text-[#9F62F2] transition-colors"
        >
          ← Back to all apps
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            <div className="lg:w-1/3 p-6 flex justify-center items-center bg-gray-100">
              <img
                src={app.image}
                alt={app.title}
                className="max-w-full max-h-96 object-contain rounded-lg"
              />
            </div>

            
            <div className="lg:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
              <p className="text-gray-500 mb-4">{app.companyName}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="font-semibold text-lg">{formatRating(app.ratingAvg)}</span>
                  <span className="text-gray-500">({app.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-download text-green-500"></i>
                  <span className="font-semibold text-lg">{formatDownloads(app.downloads)}</span>
                  <span className="text-gray-500">downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-hard-drive"></i>
                  <span className="font-semibold text-lg">{app.size} MB</span>
                </div>
              </div>

              <button
                onClick={handleInstall}
                disabled={installed}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  installed
                    ? 'bg-green-600 cursor-not-allowed'
                    : 'bg-linear-to-r from-[#632EE3] to-[#9F62F2] hover:shadow-lg hover:scale-105'
                }`}
              >
                {installed ? 'Installed ✓' : 'Install'}
              </button>
            </div>
          </div>

          {/* Chart Section. Designed a bit differently from figma */}
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rating Distribution</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#632EE3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This App</h2>
            <p className="text-gray-700 leading-relaxed">{app.description}</p>
          </div>
        </div>

        {toastVisible && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle"></i>
              <span>App installed successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppDetails;