import React, { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  stock: number; 
}


const initialIngredients = [
  { id: '1', name: 'Cheese', stock: 20 },
  { id: '2', name: 'Tomato Sauce', stock: 15 },
  { id: '3', name: 'Pepperoni', stock: 10 },
];

export default function AdminIngredients() {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', stock: '' });

  
  React.useEffect(() => {
    if (editing) {
      const ing = ingredients.find(i => i.id === editing);
      if (ing) setForm({ name: ing.name, stock: ing.stock.toString() });
    } else {
      setForm({ name: '', stock: '' });
    }
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.stock) {
      alert('Please fill name and stock');
      return;
    }
    const stockNum = parseInt(form.stock);
    if (isNaN(stockNum) || stockNum < 0) {
      alert('Stock must be a non-negative number');
      return;
    }

    if (editing) {
      setIngredients(prev =>
        prev.map(i =>
          i.id === editing ? { ...i, name: form.name, stock: stockNum } : i
        )
      );
    } else {
      const newIngredient = {
        id: Date.now().toString(),
        name: form.name,
        stock: stockNum,
      };
      setIngredients(prev => [...prev, newIngredient]);
    }
    setEditing(null);
    setForm({ name: '', stock: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure to delete this ingredient?')) {
      setIngredients(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Ingredients</h1>

      <div className="mb-8">
        {ingredients.length === 0 && <p>No ingredients found.</p>}
        <ul className="space-y-4">
          {ingredients.map(i => (
            <li
              key={i.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{i.name}</h3>
                <p>Stock: {i.stock}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditing(i.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-lg">
        <h2 className="text-2xl mb-4">{editing ? 'Edit Ingredient' : 'Add New Ingredient'}</h2>

        <input
          type="text"
          name="name"
          placeholder="Ingredient Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          min={0}
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editing ? 'Update Ingredient' : 'Add Ingredient'}
          </button>
          {editing && (
            <button
              onClick={() => setEditing(null)}
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
