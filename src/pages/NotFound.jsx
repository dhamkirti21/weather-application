const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404 - Weather Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! We can't seem to find the weather for this location.
      </p>
      <p className="text-md text-gray-500 mb-8">
        It might be raining, snowing, or just a sunny day elsewhere. Try checking the weather for another city!
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
