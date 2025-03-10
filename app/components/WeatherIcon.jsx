'use client';

/**
 * WeatherIcon Component
 * Displays a weather condition icon with customizable size
 * 
 * @param {Object} props
 * @param {string} props.iconCode - The icon URL from WeatherAPI.com
 * @param {string} props.description - Weather condition description for accessibility
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the icon
 * @returns {JSX.Element} An image element displaying the weather icon
 */
const WeatherIcon = ({ iconCode, description, size = 'medium' }) => {
  // Define size classes for different icon sizes
  const sizesMap = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  // Get the appropriate size class or default to medium
  const sizeClass = sizesMap[size] || sizesMap.medium;

  return (
    <img 
      src={`https:${iconCode}`} 
      alt={description || 'Weather icon'} 
      className={`${sizeClass} object-contain`}
      loading="lazy"
    />
  );
};

export default WeatherIcon; 