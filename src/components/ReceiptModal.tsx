import { OrderReceipt } from '../types';

type Props = {
  receipt: OrderReceipt | null;
  onClose: () => void;
};

export default function ReceiptModal({ receipt, onClose }: Props) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Order Receipt</h2>
        <p><strong>Order ID:</strong> {receipt.orderId}</p>
        <p><strong>Pizza:</strong> {receipt.pizzaName}</p>
        <p><strong>Ingredients:</strong></p>
        <ul className="list-disc list-inside">
          {receipt.selectedIngredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${receipt.totalPrice.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-2">Date: {new Date(receipt.createdAt).toLocaleString()}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
