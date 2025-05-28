import PizzaCard from "@/components/PizzaCard";


export type Role = 'admin' | 'customer';

export interface User {
  id: string;
  name: string;
  password: string;
  role: Role;
}

export interface Ingredient {
  price: number;
  id: string;
  name: string;
  stock: number;
}

export interface Pizza {
  ingredientIds: string[];
  price: any;
  description: string;
  id: string;
  name: string;
  basePrice: number;
  ingredients: Ingredient[];
}

export interface Order {
  id: string;
  userId: string;
  pizzaId: string;
  selectedIngredients: string[]; // ingredient IDs
  totalPrice: number;
  createdAt: string;
}
export interface OrderStatus {
  orderId: string;
  status: 'placed' | 'preparing' | 'Dispatched' | 'delivered';
  updatedAt: string;
}

export interface OrderReceipt {
  orderId: string;
  pizzaName: string;
  selectedIngredients: string[];
  totalPrice: number;
  createdAt: string;
}
export interface OrderHistory {
  orders: Order[];
  totalOrders: number;
  totalPrice: number;
}

export interface SelectedPizza {
  pizzaId: string;
  selectedIngredientIds: string[];
}



export type PizzaCard = {
  pizza: Pizza;
  onSelect: (pizzaId: string, ingredientIds: string[]) => void;
};

export default PizzaCard;