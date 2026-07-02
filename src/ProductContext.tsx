import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from './CartContext';
import { INITIAL_PRODUCTS } from './data';

interface ProductContextType {
  products: Product[];
  categories: string[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

const INITIAL_CATEGORIES = [
  "New Shirt",
  "Thrift Shirt",
  "Thrift Half Shirt",
  
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('store_products');
      if (saved) {
        return JSON.parse(saved) as Product[];
      }
    } catch(e) {}
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('store_categories');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        // Filter out these specific categories based on user request to remove them
        return parsed.filter(c => c !== "Thrift Full Shirt" && c !== "New Full Shirt");
      }
    } catch(e) {}
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('store_categories', JSON.stringify(categories));
  }, [categories]);

  const addProduct = (p: Product) => setProducts([p, ...products]);
  
  const updateProduct = (p: Product) => setProducts(products.map(x => x.id === p.id ? p : x));
  
  const deleteProduct = (id: string) => setProducts(products.filter(x => x.id !== id));

  const addCategory = (c: string) => {
    if (!categories.includes(c)) {
      setCategories([...categories, c]);
    }
  };

  const deleteCategory = (c: string) => {
    setCategories(categories.filter(cat => cat !== c));
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
