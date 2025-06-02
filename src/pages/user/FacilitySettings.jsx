import { useState } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const FacilitySettings = () => {
  const [settings, setSettings] = useState({
    cleaning: {
      nextScheduled: '2024-02-20T10:00',
      preferences: {
        time: '10:00',
        products: ['eco-friendly', 'fragrance-free']
      }
    },
    climate: {
      temperature: 22,
      mode: 'auto',
      schedule: [
        { time: '08:00', temp: 21 },
        { time: '18:00', temp: 23 }
      ]
    },
    lighting: {
      mode: 'auto',
      brightness: 80,
      schedule: [
        { time: '07:00', mode: 'bright' },
        { time: '19:00', mode: 'dim' }
      ]
    }
  });

  const [upcomingEvents] = useState([
    {
      id: 1,
      type: 'cleaning',
      date: '2024-02-20T10:00',
      details: 'Regular room cleaning'
    },
    {
      id: 2,
      type: 'maintenance',
      date: '2024-02-21T14:00',
      details: 'AC filter cleaning'
    }
  ]);

  const handleTemperatureChange = (temp) => {
    setSettings(prev => ({
      ...prev,
      climate: {
        ...prev.climate,
        temperature: temp
      }
    }));
  };

  const handleClimateMode = (mode) => {
    setSettings(prev => ({
      ...prev,
      climate: {
        ...prev.climate,
        mode
      }
    }));
  };

  const handleLightingMode = (mode) => {
    setSettings(prev => ({
      ...prev,
      lighting: {
        ...prev.lighting,
        mode
      }
    }));
  };

  const handleBrightnessChange = (brightness) => {
    setSettings(prev => ({
      ...prev,
      lighting: {
        ...prev.lighting,
        brightness
      }
    }));
  };

  const handleSave = () => {
    // TODO: Save settings to Supabase
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Facility Settings</h2>
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Climate Control</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Temperature
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="18"
                  max="28"
                  value={settings.climate.temperature}
                  onChange={(e) => handleTemperatureChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-700">{settings.climate.temperature}°C</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
              <div className="flex space-x-2">
                {['auto', 'heat', 'cool', 'fan'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => handleClimateMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${settings.climate.mode === mode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lighting Control</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
              <div className="flex space-x-2">
                {['auto', 'bright', 'dim', 'off'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => handleLightingMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${settings.lighting.mode === mode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.lighting.brightness}
                  onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-700">{settings.lighting.brightness}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cleaning Schedule</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Scheduled Cleaning
              </label>
              <div className="flex items-center text-gray-700">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {new Date(settings.cleaning.nextScheduled).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                <ClockIcon className="h-5 w-5 mx-2" />
                {settings.cleaning.preferences.time}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cleaning Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {settings.cleaning.preferences.products.map(product => (
                  <span
                    key={product}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-start p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {event.type}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitySettings;