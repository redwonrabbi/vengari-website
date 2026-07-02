import React, { useState } from 'react';
import { useProducts } from './ProductContext';
import { Product } from './CartContext';
import { Link } from 'react-router-dom';

export function AdminPanel() {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '', price: 0, image: '', images: [], category: 'New Shirt', sizes: [], description: '', soldOut: false
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_token', data.token);
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setLoginError('Could not reach server. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData(p);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({ title: '', price: 0, image: '', images: [], category: 'New Shirt', sizes: [], description: '', soldOut: false });
  };

  const currentProduct = editingProduct !== null ? editingProduct : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) return;
    
    // Clean up empty strings from images array
    const cleanImages = formData.images ? formData.images.filter(img => img.trim() !== '') : [];
    const finalData = {
      ...formData,
      image: cleanImages.length > 0 ? cleanImages[0] : formData.image,
      images: cleanImages.length > 0 ? cleanImages : [formData.image]
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...finalData } as Product);
      setEditingProduct(null);
    } else {
      addProduct({ 
        ...finalData, 
        id: Math.random().toString(36).substr(2, 9),
        sizes: typeof finalData.sizes === 'string' 
          ? (finalData.sizes as unknown as string).split(',').map(s=>s.trim()).filter(Boolean) 
          : finalData.sizes
      } as Product);
    }
    handleCreate();
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50 flex items-center justify-center -mt-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          {loginError && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-bold text-center">{loginError}</div>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Username</label>
              <input required type="text" className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input required type="password" className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={isLoggingIn} className="w-full bg-brand-black text-brand-white p-4 rounded-xl font-bold mt-2 hover:opacity-90 transition-opacity disabled:opacity-60">
              {isLoggingIn ? 'Checking...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input required type="text" className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Price</label>
                <input required type="number" className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Product Images (Add 3 or more photos)</label>
                {(() => {
                  const currentImages = formData.images && formData.images.length > 0 
                    ? formData.images 
                    : [formData.image || '', '', ''];
                  
                  return currentImages.map((img, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        required={index === 0}
                        className="w-full bg-gray-100 p-3 rounded-xl outline-none"
                        placeholder={index === 0 ? "Main Image URL" : `Additional Image URL ${index + 1}`}
                        value={img}
                        onChange={e => {
                          const newImages = [...currentImages];
                          newImages[index] = e.target.value;
                          setFormData({
                            ...formData,
                            image: newImages[0] || '', // Always keep main image synced
                            images: newImages
                          });
                        }}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="bg-red-100 text-red-500 px-4 rounded-xl font-bold hover:bg-red-200 transition-colors"
                          onClick={() => {
                            const newImages = [...currentImages];
                            newImages.splice(index, 1);
                            setFormData({
                              ...formData,
                              image: newImages[0] || '',
                              images: newImages
                            });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ));
                })()}
                <button
                  type="button"
                  className="w-full bg-gray-200 text-brand-black p-3 rounded-xl font-bold mt-2 hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    const currentImages = formData.images && formData.images.length > 0 
                      ? formData.images 
                      : [formData.image || '', '', ''];
                    setFormData({
                      ...formData,
                      images: [...currentImages, '']
                    });
                  }}
                >
                  + Add Another Image
                </button>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <select className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Sizes (comma separated)</label>
                <input type="text" className="w-full bg-gray-100 p-3 rounded-xl outline-none" value={Array.isArray(formData.sizes) ? formData.sizes.join(', ') : (formData.sizes || '')} onChange={e => setFormData({...formData, sizes: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="soldOut"
                  className="w-5 h-5 accent-brand-black"
                  checked={formData.soldOut || false}
                  onChange={e => setFormData({...formData, soldOut: e.target.checked})}
                />
                <label htmlFor="soldOut" className="text-sm font-bold cursor-pointer">Mark as Sold Out</label>
              </div>
              {editingProduct ? (
                <div className="flex gap-4 mt-2">
                  <button type="button" onClick={handleCreate} className="w-full bg-gray-200 text-brand-black p-4 rounded-xl font-bold transition-colors hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" className="w-full bg-brand-black text-brand-white p-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Update
                  </button>
                </div>
              ) : (
                <button type="submit" className="w-full bg-brand-black text-brand-white p-4 rounded-xl font-bold hover:opacity-90 transition-opacity mt-2">
                  Add Product
                </button>
              )}
            </form>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newCategory.trim()) {
                      addCategory(newCategory.trim());
                      setNewCategory('');
                    }
                  }} 
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    required
                    className="flex-1 bg-gray-100 p-3 rounded-xl outline-none"
                    placeholder="New category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button type="submit" className="bg-brand-black text-brand-white px-6 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <span className="font-medium text-sm">{cat}</span>
                      <button 
                        onClick={() => deleteCategory(cat)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                        title="Delete category"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[600px] overflow-y-auto">
              {products.map(product => (
                <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 sm:items-center">
                  <img src={product.image} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-gray-500 font-medium">৳{product.price}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => handleEdit(product)} className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition-colors">Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition-colors">Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
