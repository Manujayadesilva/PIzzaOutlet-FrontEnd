'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function HomePage() {
  const router = useRouter();

  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserLogin = () => {
    router.push('/customer');
  };

  const handleAdminLogin = () => {
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      router.push('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-[#ffeabf] to-[#ffd6cc] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-red-600 drop-shadow-md mb-3">
          🍕 FireCrust Pizza
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Order your favorite pizza or manage the outlet.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* User Login */}
          <div className="w-80 p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold text-green-700 mb-4">User Login</h2>
            <button
              onClick={handleUserLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition"
            >
              Continue as Guest
            </button>
          </div>

          {/* Admin Login */}
          <div className="w-80 p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-300 outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-300 outline-none transition"
            />
            <button
              onClick={handleAdminLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition"
            >
              Admin Login
            </button>
            {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
