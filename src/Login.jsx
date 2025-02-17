import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://4dkf27s7-8000.inc1.devtunnels.ms/app/login/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.is_superuser) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4 overflow-hidden relative">

      <div className=" p-8 rounded-xl bg-gradient-to-tr from-red-200 to-blue-200 shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 relative z-10 antialiased">
        <div className="text-center mb-8 transform-gpu">
          <div className='flex justify-between items-center'>
            <h1 className="text-3xl font-bold mb-2 subpixel-antialiased">Login</h1>
            <Link to="/"><X size={24} /></Link>
          </div> 
          <p className="text-gray-400 subpixel-antialiased">Access your drone dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 block subpixel-antialiased">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 block subpixel-antialiased">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-1000 focus:ring-blue-500"
                id="remember"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 subpixel-antialiased">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 subpixel-antialiased">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center subpixel-antialiased"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : null}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 subpixel-antialiased">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;