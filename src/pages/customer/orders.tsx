'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const userId = 'demo-user-id'; // Replace with actual auth user ID

  useEffect(() => {
    axios.get(`/api/orders?userId=${userId}`).then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="border mb-4 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
            <p>Status: {order.status}</p>
            <ul className="mt-2 list-disc pl-5">
              {order.items.map((item: any, idx: number) => (
                <li key={idx}>
                  <strong>{item.pizzaName}</strong> with{' '}
                  {item.ingredients.length ? item.ingredients.join(', ') : 'no extras'}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
