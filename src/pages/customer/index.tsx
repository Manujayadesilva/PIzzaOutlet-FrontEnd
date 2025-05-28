'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SelectedPizza } from '@/types';

// Dummy data (replace with real API calls)
const pizzas = [
  { id: '1', name: 'Margherita', basePrice: 5, ingredientIds: ['1', '2'] },
  { id: '2', name: 'Pepperoni', basePrice: 7, ingredientIds: ['1', '3'] },
];

const ingredients = [
  { id: '1', name: 'Cheese', stock: 10 },
  { id: '2', name: 'Tomato Sauce', stock: 5 },
  { id: '3', name: 'Pepperoni', stock: 2 },
];

export default function CustomerMenu() {
  const [cart, setCart] = useState<SelectedPizza[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, Set<string>>>({});
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleIngredient = (pizzaId: string, ingredientId: string) => {
    setSelectedIngredients((prev) => {
      const current = new Set(prev[pizzaId] || []);
      current.has(ingredientId) ? current.delete(ingredientId) : current.add(ingredientId);
      return { ...prev, [pizzaId]: current };
    });
  };

  const addToCart = (pizzaId: string) => {
    const selected = selectedIngredients[pizzaId] ? Array.from(selectedIngredients[pizzaId]) : [];

    // Stock validation
    const hasStock = selected.every((id) => {
      const ing = ingredients.find((i) => i.id === id);
      return ing && ing.stock > 0;
    });

    if (!hasStock) {
      alert('Some ingredients are out of stock!');
      return;
    }

    const newCartItem = { pizzaId, selectedIngredientIds: selected };
    const updatedCart = [...cart, newCartItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setSelectedIngredients((prev) => ({ ...prev, [pizzaId]: new Set() }));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    router.push('/customer/checkout');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Pizza</h1>

      {pizzas.map((pizza) => (
        <div key={pizza.id} className="mb-8 border p-4 rounded shadow">
          <h2 className="text-2xl font-semibold">{pizza.name}</h2>
          <p>Base Price: Rs.{pizza.basePrice}</p>

          <div className="mt-2">
            <p className="font-semibold">Select Ingredients (stock shown):</p>
            {pizza.ingredientIds.map((id) => {
              const ingredient = ingredients.find((ing) => ing.id === id);
              const selectedSet = selectedIngredients[pizza.id] || new Set();
              return (
                <label key={id} className="block">
                  <input
                    type="checkbox"
                    checked={selectedSet.has(id)}
                    disabled={ingredient?.stock === 0}
                    onChange={() => toggleIngredient(pizza.id, id)}
                    className="mr-2"
                  />
                  {ingredient?.name} (Stock: {ingredient?.stock})
                </label>
              );
            })}
          </div>

          <button
            onClick={() => addToCart(pizza.id)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      ))}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length === 0 && <p>Your cart is empty.</p>}

        <ul>
          {cart.map((item, index) => {
            const pizza = pizzas.find((p) => p.id === item.pizzaId);
            const ingredientNames = item.selectedIngredientIds
              .map((id) => ingredients.find((ing) => ing.id === id)?.name)
              .filter(Boolean)
              .join(', ');
            return (
              <li key={index} className="mb-2 border p-2 rounded">
                <strong>{pizza?.name}</strong> with: {ingredientNames || 'No extra ingredients'}
              </li>
            );
          })}
        </ul>

        {cart.length > 0 && (
          <button
            onClick={handlePlaceOrder}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Go to Checkout
          </button>
        )}
      </div>
    </div>
  );
}
