import { useState } from 'react';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      lowCarb: false,
      highProtein: false
    },
    spiceLevel: 'medium',
    roomTemperature: 22,
    cleaningFrequency: 'daily',
    notifications: {
      orderStatus: true,
      specialOffers: false,
      cleaningReminders: true
    }
  });

  const handleDietaryChange = (preference) => {
    setPreferences(prev => ({
      ...prev,
      dietary: {
        ...prev.dietary,
        [preference]: !prev.dietary[preference]
      }
    }));
  };

  const handleSpiceLevelChange = (level) => {
    setPreferences(prev => ({ ...prev, spiceLevel: level }));
  };

  const handleTemperatureChange = (temp) => {
    setPreferences(prev => ({ ...prev, roomTemperature: temp }));
  };

  const handleCleaningFrequencyChange = (frequency) => {
    setPreferences(prev => ({ ...prev, cleaningFrequency: frequency }));
  };

  const handleNotificationChange = (type) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSave = () => {
    // TODO: Save preferences to Supabase
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Preferences</h2>
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Dietary Preferences</h3>
          <div className="space-y-4">
            {Object.entries(preferences.dietary).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleDietaryChange(key)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Spice Level Preference</h3>
          <div className="space-y-4">
            {['mild', 'medium', 'hot', 'extra hot'].map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="spiceLevel"
                  value={level}
                  checked={preferences.spiceLevel === level}
                  onChange={() => handleSpiceLevelChange(level)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700 capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Room Temperature</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="18"
                max="28"
                value={preferences.roomTemperature}
                onChange={(e) => handleTemperatureChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-700">{preferences.roomTemperature}°C</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cleaning Frequency</h3>
          <div className="space-y-4">
            {['daily', 'every other day', 'twice a week', 'weekly'].map(frequency => (
              <label key={frequency} className="flex items-center">
                <input
                  type="radio"
                  name="cleaningFrequency"
                  value={frequency}
                  checked={preferences.cleaningFrequency === frequency}
                  onChange={() => handleCleaningFrequencyChange(frequency)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700 capitalize">{frequency}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;