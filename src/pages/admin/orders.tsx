import React, { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  pizzas: Array<{
    pizzaId: string;
    selectedIngredientIds: string[];
  }>;
  status: 'Pending' | 'In Progress' | 'Completed';
}
interface Pizza {
  id: string;
  name: string;
}

const initialPizzas = [
  { id: '1', name: 'Margherita' },
  { id: '2', name: 'Pepperoni' },
];

const initialIngredients = [
  { id: '1', name: 'Cheese' },
  { id: '2', name: 'Tomato Sauce' },
  { id: '3', name: 'Pepperoni' },
];

const initialOrders: Order[] = [
  {
    id: '101',
    customerName: 'John Doe',
    pizzas: [
      { pizzaId: '1', selectedIngredientIds: ['1', '2'] },
      { pizzaId: '2', selectedIngredientIds: ['1', '3'] },
    ],
    status: 'Pending',
  },
  {
    id: '102',
    customerName: 'Jane Smith',
    pizzas: [{ pizzaId: '2', selectedIngredientIds: ['1', '3'] }],
    status: 'In Progress',
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const getPizzaName = (id: string) =>
    initialPizzas.find(p => p.id === id)?.name || 'Unknown Pizza';

  const getIngredientName = (id: string) =>
    initialIngredients.find(i => i.id === id)?.name || 'Unknown Ingredient';

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      <ul className="space-y-6">
        {orders.map(order => (
          <li
            key={order.id}
            className="bg-white p-6 rounded shadow cursor-pointer"
            onClick={() => toggleExpand(order.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p>Customer: {order.customerName}</p>
                <p>Status: {order.status}</p>
              </div>

              <select
                className="border rounded p-1"
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                onClick={e => e.stopPropagation()}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {expandedOrderId === order.id && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Pizzas:</h3>
                <ul className="space-y-2">
                  {order.pizzas.map((p, idx) => (
                    <li key={idx} className="border p-2 rounded bg-gray-50">
                      <p className="font-semibold">{getPizzaName(p.pizzaId)}</p>
                      <p>
                        Ingredients:{' '}
                        {p.selectedIngredientIds
                          .map(id => getIngredientName(id))
                          .join(', ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
