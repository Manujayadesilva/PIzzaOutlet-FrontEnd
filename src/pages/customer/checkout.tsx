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
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    axios.get('/api/pizzas').then(res => setPizzas(res.data));
    axios.get('/api/ingredients').then(res => setIngredients(res.data));
  }, []);

  const handlePlaceOrder = async () => {
    const orderRef = uuidv4();
    try {
      await axios.post('/api/orders', { cart, orderId: orderRef });
      setMessage('✅ Order placed successfully!');
      setOrderId(orderRef);
      localStorage.removeItem('cart');
      setCart([]);
    } catch (err: any) {
      setMessage(`❌ Error placing order: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <>
          <div className="grid gap-4 mb-8">
            {cart.map((item, index) => {
              const pizza = pizzas.find(p => p.id === item.pizzaId);
              const ingredientList = item.selectedIngredientIds
                .map(id => ingredients.find(ing => ing.id === id)?.name)
                .filter(Boolean)
                .join(', ');

              return (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {pizza?.name}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Ingredients:</span>{' '}
                    {ingredientList || 'No extra ingredients'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg transition"
            >
              Confirm and Place Order
            </button>

            {message && (
              <p className="mt-6 text-lg text-green-700 font-medium">
                {message}{' '}
                {orderId && (
                  <span className="block text-gray-800 mt-1">
                    Order ID: <code className="bg-gray-100 px-2 py-1 rounded">{orderId}</code>
                  </span>
                )}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
