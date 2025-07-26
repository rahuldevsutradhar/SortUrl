import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', login);

      if (response.status === 200) {
        toast.success('✅ Login successful');
        setLogin({ email: '', password: '' }); // optional: reset fields
      }
    } catch (error) {
      const errorMsg = error.response?.data || '❌ Login failed';
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toast Container */}
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Welcome Back</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-black mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email" // ✅ required
              value={login.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-black mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password" // ✅ required
              value={login.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-black">
          Don't have an account?{' '}
          <a href="/registration" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
