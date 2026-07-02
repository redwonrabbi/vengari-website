import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from './ToastContext';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  sizes?: string[];
  soldOut?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  cartItemId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  cartTotal: number;
  subtotal: number;
  discount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { addToast } = useToast();

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart((prev) => {
      const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : product.id;
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize, cartItemId }];
    });
    addToast(`Added ${product.title} to cart.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    if (item) {
       addToast(`Removed ${item.title} from cart.`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const count350 = cart.reduce((count, item) => item.price === 350 ? count + item.quantity : count, 0);
  const discount = Math.floor(count350 / 2) * 100;
  const cartTotal = subtotal - discount;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, subtotal, discount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
