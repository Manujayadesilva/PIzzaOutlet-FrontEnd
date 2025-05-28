'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectedPizza } from '@/types';


const pizzas = [
  { id: '1', name: 'Margherita', basePrice: 5, ingredientIds: ['1', '2'] },
  { id: '2', name: 'Pepperoni',  basePrice: 7, ingredientIds: ['1', '3'] },
];

const ingredients = [
  { id: '1', name: 'Cheese',       stock: 10 },
  { id: '2', name: 'Tomato Sauce', stock: 5  },
  { id: '3', name: 'Pepperoni',    stock: 2  },
];


export default function CustomerMenu() {
  const router = useRouter();
  const [cart, setCart] = useState<SelectedPizza[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, Set<string>>>({});

  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const toggleIngredient = (pizzaId: string, ingredientId: string) => {
    setSelectedIngredients(prev => {
      const current = new Set(prev[pizzaId] || []);
      current.has(ingredientId) ? current.delete(ingredientId) : current.add(ingredientId);
      return { ...prev, [pizzaId]: current };
    });
  };

  const addToCart = (pizzaId: string) => {
    const selected = selectedIngredients[pizzaId] ? Array.from(selectedIngredients[pizzaId]) : [];

    // Stock validation
    const hasStock = selected.every(id => ingredients.find(i => i.id === id)?.stock! > 0);
    if (!hasStock) return alert('Some ingredients are out of stock!');

    const updatedCart = [...cart, { pizzaId, selectedIngredientIds: selected }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setSelectedIngredients(prev => ({ ...prev, [pizzaId]: new Set() }));
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    if (cart.length) router.push('/customer/checkout');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-100/70 py-10">
      <section className="max-w-5xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 drop-shadow-sm">
            🍕 Build Your Pizza
          </h1>
          <p className="mt-2 text-gray-600">
            Select ingredients &amp; add multiple pizzas to your cart.
          </p>
        </header>

        {/* Pizza Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pizzas.map(pizza => (
            <article
              key={pizza.id}
              className="relative rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg p-6 ring-1 ring-white/20 hover:scale-105 transition-transform"
            >
              <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                Rs.{pizza.basePrice}
              </span>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">{pizza.name}</h2>

              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Choose ingredients:</p>

                {pizza.ingredientIds.map(id => {
                  const ing = ingredients.find(i => i.id === id);
                  const selected = selectedIngredients[pizza.id]?.has(id);
                  const outOfStock = ing!.stock === 0;

                  return (
                    <label
                      key={id}
                      className={`flex items-center gap-2 text-sm font-medium 
                        ${outOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={outOfStock}
                        onChange={() => toggleIngredient(pizza.id, id)}
                        className="h-4 w-4 accent-rose-600 disabled:opacity-30"
                      />
                      {ing!.name}
                      <span
                        className={`ml-auto inline-block px-2 py-0.5 rounded-full text-[10px] tracking-wide
                          ${outOfStock ? 'bg-gray-400 text-white' : 'bg-emerald-600/10 text-emerald-700'}`}
                      >
                        Stock {ing!.stock}
                      </span>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={() => addToCart(pizza.id)}
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-2 rounded-full transition"
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>

        {/* Cart Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🛒 Your Cart</span>
            <span className="text-base bg-rose-600 text-white rounded-full px-2">
              {cart.length}
            </span>
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((item, idx) => {
                  const pizza = pizzas.find(p => p.id === item.pizzaId)!;
                  const ingredientNames = item.selectedIngredientIds
                    .map(id => ingredients.find(i => i.id === id)?.name)
                    .filter(Boolean)
                    .join(', ');

                  return (
                    <li
                      key={idx}
                      className="bg-white/60 backdrop-blur-lg rounded-xl p-4 shadow ring-1 ring-white/20 flex justify-between items-start"
                    >
                      <div>
                        <strong>{pizza.name}</strong>{' '}
                        <span className="text-xs text-gray-500 block">
                          {ingredientNames || 'No extra ingredients'}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-sm text-red-600 hover:underline ml-4"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={handlePlaceOrder}
                className="mt-8 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold px-8 py-3 rounded-full transition"
              >
                Go to Checkout →
              </button>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
