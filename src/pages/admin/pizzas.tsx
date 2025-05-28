import React, { useState, useEffect } from 'react';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredientIds: string[]; 
}


const initialPizzas = [
  { id: '1', name: 'Margherita', description: 'Classic with cheese and tomato', price: 9.99, ingredientIds: ['1', '2'] },
  { id: '2', name: 'Pepperoni', description: 'Spicy pepperoni with cheese', price: 12.99, ingredientIds: ['1', '3'] },
];

const initialIngredients = [
  { id: '1', name: 'Cheese' },
  { id: '2', name: 'Tomato Sauce' },
  { id: '3', name: 'Pepperoni' },
];

export default function AdminPizzas() {
  const [pizzas, setPizzas] = useState(initialPizzas);
  const [ingredients, setIngredients] = useState(initialIngredients);

  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    ingredientIds: [] as string[],
  });

  
  useEffect(() => {
    if (editingPizza) {
      setForm({
        name: editingPizza.name,
        description: editingPizza.description,
        price: editingPizza.price.toString(),
        ingredientIds: editingPizza.ingredientIds,
      });
    } else {
      setForm({ name: '', description: '', price: '', ingredientIds: [] });
    }
  }, [editingPizza]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIngredientToggle = (id: string) => {
    setForm(prev => {
      const selected = prev.ingredientIds.includes(id);
      return {
        ...prev,
        ingredientIds: selected
          ? prev.ingredientIds.filter(i => i !== id)
          : [...prev.ingredientIds, id],
      };
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert('Please enter pizza name and price');
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum)) {
      alert('Price must be a number');
      return;
    }

    if (editingPizza) {
      // Update existing pizza
      setPizzas(prev =>
        prev.map(p =>
          p.id === editingPizza.id
            ? {
                ...p,
                name: form.name,
                description: form.description,
                price: priceNum,
                ingredientIds: form.ingredientIds,
              }
            : p
        )
      );
    } else {
      // Add new pizza
      const newPizza = {
        id: Date.now().toString(),
        name: form.name,
        description: form.description,
        price: priceNum,
        ingredientIds: form.ingredientIds,
      };
      setPizzas(prev => [...prev, newPizza]);
    }
    setEditingPizza(null);
    setForm({ name: '', description: '', price: '', ingredientIds: [] });
  };

  const handleEdit = (pizza: Pizza) => setEditingPizza(pizza);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pizza?')) {
      setPizzas(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Pizzas</h1>

      {/* Pizza List */}
      <div className="mb-8">
        {pizzas.length === 0 && <p>No pizzas available.</p>}
        <ul className="space-y-4">
          {pizzas.map(pizza => (
            <li
              key={pizza.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{pizza.name}</h3>
                <p className="text-gray-600">{pizza.description}</p>
                <p className="font-semibold">Rs.{pizza.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Ingredients:{' '}
                  {pizza.ingredientIds
                    .map(id => ingredients.find(i => i.id === id)?.name || 'Unknown')
                    .join(', ')}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(pizza)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pizza.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-white p-6 rounded shadow max-w-lg">
        <h2 className="text-2xl mb-4">{editingPizza ? 'Edit Pizza' : 'Add New Pizza'}</h2>

        <input
          type="text"
          name="name"
          placeholder="Pizza Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          rows={3}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="mb-4">
          <p className="font-semibold mb-1">Select Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ing => (
              <label key={ing.id} className="inline-flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={form.ingredientIds.includes(ing.id)}
                  onChange={() => handleIngredientToggle(ing.id)}
                />
                <span>{ing.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingPizza ? 'Update Pizza' : 'Add Pizza'}
          </button>
          {editingPizza && (
            <button
              onClick={() => setEditingPizza(null)}
              className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
