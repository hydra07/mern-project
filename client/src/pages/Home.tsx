const Home = () => {
  return (
    <>
      <div className="bg-gray-400 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Homepage</h1>
          <p className="text-lg text-gray-700 mb-6">
            This is a simple example of a homepage using React and Tailwind CSS.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
          <button className="bg-blue-500 hover:bg">Button</button>
        </div>
      </div>
    </>
  );
};

export default Home;
