'use client';

import WeatherIcon from './WeatherIcon';

/**
 * WeatherForecast Component
 * Displays a 3-day weather forecast with daily weather conditions
 * 
 * @param {Object} props
 * @param {Object} props.forecastData - Forecast data from WeatherAPI.com
 * @returns {JSX.Element | null} A grid of forecast cards or null if no data
 */
const WeatherForecast = ({ forecastData }) => {
  // Return null if no forecast data is available
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const { forecastday } = forecastData.forecast;

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-2">
        {forecastday.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
};

/**
 * ForecastCard Component
 * Displays weather forecast for a single day
 * 
 * @param {Object} props
 * @param {Object} props.day - Daily forecast data
 * @returns {JSX.Element} A card showing daily forecast
 */
const ForecastCard = ({ day }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
    <p className="font-medium">
      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
    </p>
    <WeatherIcon 
      iconCode={day.day.condition.icon}
      description={day.day.condition.text}
      size="small"
    />
    <p className="text-sm font-bold">{Math.round(day.day.avgtemp_c)}°C</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
      {day.day.condition.text}
    </p>
  </div>
);

export default WeatherForecast; 