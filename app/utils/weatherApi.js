// WeatherAPI.com API utility functions
// const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY || 'YOUR_API_KEY'; // Get your API key from https://www.weatherapi.com/
const API_KEY = "844ac096ddc548fe8a0150327251003" || 'YOUR_API_KEY'; // Get your API key from https://www.weatherapi.com/
const BASE_URL = 'http://api.weatherapi.com/v1';

// Get weather data by city name
export async function getWeatherByCity(city) {
  try {
    const encodedCity = encodeURIComponent(city.trim());
    
    console.log(`Fetching weather for city: ${encodedCity}`);
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodedCity}&aqi=no`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`Weather data not found: ${errorData.error.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Weather data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Get weather data by coordinates
export async function getWeatherByCoords(lat, lon) {
  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`Weather data not found: ${errorData.error.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Weather data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Get weather forecast (3 days)
export async function getWeatherForecast(city) {
  try {
    const encodedCity = encodeURIComponent(city.trim());
    
    console.log(`Fetching forecast for city: ${encodedCity}`);
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodedCity}&days=3&aqi=no`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`Forecast data not found: ${errorData.error.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Forecast data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
} 