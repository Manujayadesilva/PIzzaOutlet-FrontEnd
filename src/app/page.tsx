'use client';
import React from 'react';
import { useState } from 'react';
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100 px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-6 text-center">
        🍕 Welcome to FireCrust Pizza
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-xl">
        
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* User Login Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">User Login</h2>
          <button
            onClick={handleUserLogin}
            className="bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded-full"
          >
            Continue as Guest
          </button>
        </div>

        {/* Admin Login Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <button
            onClick={handleAdminLogin}
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 w-full rounded-full"
          >
            Admin Login
          </button>
          {error && <p className="text-red-600 mt-2 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
