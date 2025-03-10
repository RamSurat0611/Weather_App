'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocationSearch from './components/LocationSearch';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import GeoLocationButton from './components/GeoLocationButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherByCity, getWeatherByCoords, getWeatherForecast } from './utils/weatherApi';

/**
 * Home Component
 * Main page of the weather application
 * Handles weather data fetching and display
 */
export default function Home() {
  // State management
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSearched, setLastSearched] = useState('');

  /**
   * Handles city search and fetches weather data
   * @param {string} city - Name of the city to search for
   */
  const handleCitySearch = async (city) => {
    setLoading(true);
    setError('');
    try {
      // Fetch current weather
      console.log(`Searching for city: ${city}`);
      const data = await getWeatherByCity(city);
      console.log('Weather data retrieved for:', data.location.name);
      setWeatherData(data);
      setLastSearched(city);
      
      // Fetch forecast data
      const forecast = await getWeatherForecast(city);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error in handleCitySearch:', error.message);
      setError(`Could not find weather data for "${city}". Please verify the city name and try again.`);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles geolocation-based weather data fetching
   * @param {number} latitude - User's latitude
   * @param {number} longitude - User's longitude
   */
  const handleLocationDetected = async (latitude, longitude) => {
    setLoading(true);
    setError('');
    try {
      // Fetch current weather
      console.log(`Getting weather for coordinates: ${latitude}, ${longitude}`);
      const data = await getWeatherByCoords(latitude, longitude);
      console.log('Weather data retrieved for location:', data.location.name);
      setWeatherData(data);
      setLastSearched(`${data.location.name}, ${data.location.country}`);
      
      // Fetch forecast data
      const forecast = await getWeatherForecast(data.location.name);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error in handleLocationDetected:', error.message);
      setError('Could not find weather data for your location. Please try searching by city name instead.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Debug: Check API key availability
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
    console.log('API Key status:', apiKey ? 'Available (first 5 chars: ' + apiKey.substring(0, 5) + '...)' : 'Not available');
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-blue-600 dark:text-blue-400">
            Weather Forecast
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get real-time weather information for any location
          </p>
        </header>

        {/* Search Controls */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-between items-center">
            <LocationSearch onSearch={handleCitySearch} loading={loading} />
            <GeoLocationButton onLocationDetected={handleLocationDetected} loading={loading} />
          </div>
          <ErrorMessage message={error} />
        </div>

        {/* Weather Display */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col items-center">
            {weatherData && (
              <>
                <WeatherCard weatherData={weatherData} />
                <WeatherForecast forecastData={forecastData} />
              </>
            )}
            
            {/* Initial State Message */}
            {!weatherData && !loading && !error && (
              <div className="text-center p-8">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Enter a city name or use your current location to get weather information
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Data provided by WeatherAPI.com</p>
          <p className="mt-1">© {new Date().getFullYear()} Weather App</p>
        </footer>
      </div>
    </div>
  );
}
