import Link from 'next/link';
import React from 'react';


export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link href="/admin/pizzas">
          <div className="bg-white p-6 rounded shadow hover:shadow-md cursor-pointer">
            <h2 className="text-xl font-semibold">🍕 Manage Pizzas</h2>
            <p className="text-gray-600 mt-2">Add, update or delete pizza items and their ingredients.</p>
          </div>
        </Link>

        <Link href="/admin/ingredients">
          <div className="bg-white p-6 rounded shadow hover:shadow-md cursor-pointer">
            <h2 className="text-xl font-semibold">🍅 Manage Ingredients</h2>
            <p className="text-gray-600 mt-2">Add/edit ingredients and maintain stock levels.</p>
          </div>
        </Link>

        <Link href="/admin/orders">
          <div className="bg-white p-6 rounded shadow hover:shadow-md cursor-pointer">
            <h2 className="text-xl font-semibold">📦 Orders</h2>
            <p className="text-gray-600 mt-2">View and update customer orders.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
