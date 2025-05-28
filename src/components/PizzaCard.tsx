import { useState } from 'react';
import { Ingredient, Pizza } from '../types';

type Props = {
  pizza: Pizza;
  onSelect: (pizzaId: string, ingredientIds: string[]) => void;
};

export default function PizzaCard({ pizza, onSelect }: Props) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold">{pizza.name}</h2>
      <p className="text-sm text-gray-500">Base Price: ${pizza.basePrice}</p>

      <h3 className="mt-4 font-medium">Choose Ingredients:</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {pizza.ingredients.map((ing) => (
          <button
            key={ing.id}
            className={`px-3 py-1 rounded border ${
              selectedIngredients.includes(ing.id)
                ? 'bg-green-200 border-green-500'
                : 'bg-gray-100'
            }`}
            onClick={() => toggleIngredient(ing.id)}
            type="button"
          >
            {ing.name}
          </button>
        ))}
      </div>

      <button
        onClick={() => onSelect(pizza.id, selectedIngredients)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Order
      </button>
    </div>
  );
}
