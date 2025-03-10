'use client';

import WeatherIcon from './WeatherIcon';

/**
 * WeatherCard Component
 * Displays current weather information including temperature, conditions, and other metrics
 * 
 * @param {Object} props
 * @param {Object} props.weatherData - Weather data from WeatherAPI.com
 * @returns {JSX.Element} A card displaying weather information
 */
const WeatherCard = ({ weatherData }) => {
  // Show placeholder when no data is available
  if (!weatherData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">No weather data available</p>
      </div>
    );
  }

  // Destructure weather data
  const { current, location } = weatherData;
  
  // Extract icon code from the full icon URL
  const iconCode = current?.condition?.icon || '';

  // Render weather card
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-md">
      {/* Location Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{location?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{location?.country}</p>
        </div>
        <div className="flex items-center">
          <WeatherIcon 
            iconCode={iconCode} 
            description={current?.condition?.text}
            size="medium"
          />
        </div>
      </div>
      
      {/* Current Weather */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">{Math.round(current?.temp_c)}°C</p>
          <p className="text-gray-700 dark:text-gray-300 capitalize">
            {current?.condition?.text}
          </p>
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Feels like: {Math.round(current?.feelslike_c)}°C</p>
          <p>Humidity: {current?.humidity}%</p>
        </div>
      </div>
      
      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <WeatherMetric label="Wind" value={`${current?.wind_kph} km/h`} />
        <WeatherMetric label="Pressure" value={`${current?.pressure_mb} mb`} />
        <WeatherMetric label="Min Temp" value={`${Math.round(current?.temp_c)}°C`} />
        <WeatherMetric label="Max Temp" value={`${Math.round(current?.temp_c)}°C`} />
      </div>
    </div>
  );
};

/**
 * WeatherMetric Component
 * Displays a single weather metric with a label and value
 */
const WeatherMetric = ({ label, value }) => (
  <div className="text-center">
    <p className="text-gray-500 dark:text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default WeatherCard; 