import { useEffect, useState } from 'react';
import PizzaCard from '../components/PizzaCard';
import ReceiptModal from '../components/ReceiptModal';
import { OrderReceipt, Pizza } from '../types';
import axios from 'axios';

export default function OrderPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    axios
      .get<Pizza[]>('http://localhost:8080/api/pizzas')
      .then((res) => setPizzas(res.data))
      .catch((err) => console.error('Error fetching pizzas:', err));
  }, []);

  const handleAddToOrder = (pizzaId: string, ingredientIds: string[]) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    axios
      .post(
        'http://localhost:8080/api/orders',
        {
          userId,
          pizzaId,
          selectedIngredients: ingredientIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setReceipt(res.data)) // backend should return a receipt
      .catch(() => alert('Failed to place order.'));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Your Pizza</h1>
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} onSelect={handleAddToOrder} />
      ))}

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
