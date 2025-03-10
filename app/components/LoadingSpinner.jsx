'use client';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-16">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 