// Login.js
import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-purple-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
