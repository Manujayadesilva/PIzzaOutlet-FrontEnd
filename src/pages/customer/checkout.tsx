'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

interface Ingredient {
  id: string;
  name: string;
  stock: number;
}

interface Pizza {
  id: string;
  name: string;
  basePrice: number;
}

interface CartItem {
  pizzaId: string;
  selectedIngredientIds: string[];
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Replace with real cart fetch or context
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Fetch pizzas & ingredients
    axios.get('/api/pizzas').then(res => setPizzas(res.data));
    axios.get('/api/ingredients').then(res => setIngredients(res.data));
  }, []);

  const handlePlaceOrder = async () => {
    const orderRef = uuidv4();
    try {
      const res = await axios.post('/api/orders', { cart, orderId: orderRef });
      setMessage('Order placed successfully!');
      setOrderId(orderRef);
      localStorage.removeItem('cart');
    } catch (err: any) {
      setMessage(`Error placing order: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6">
            {cart.map((item, index) => {
              const pizza = pizzas.find(p => p.id === item.pizzaId);
              const ingNames = item.selectedIngredientIds
                .map(id => ingredients.find(ing => ing.id === id)?.name)
                .filter(Boolean)
                .join(', ');
              return (
                <li key={index} className="mb-2 border p-2 rounded">
                  <strong>{pizza?.name}</strong> with: {ingNames || 'No extra ingredients'}
                </li>
              );
            })}
          </ul>

          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Place Order
          </button>

          {message && (
            <p className="mt-4 text-green-700 font-semibold">
              {message} {orderId && <span>Order ID: <code>{orderId}</code></span>}
            </p>
          )}
        </>
      )}
    </div>
  );
}
