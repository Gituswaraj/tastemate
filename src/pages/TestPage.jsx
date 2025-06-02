import React from 'react';
import TestComponent from '../components/TestComponent';

const TestPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Test Page</h1>
      <div className="w-full max-w-md">
        <TestComponent />
      </div>
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Debug Information</h2>
        <p className="text-gray-700">This is a standalone test page that doesn't require authentication.</p>
        <p className="text-gray-700 mt-2">If you can see this content with styling, React and Tailwind CSS are working correctly.</p>
      </div>
    </div>
  );
};

export default TestPage;