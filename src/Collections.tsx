import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart, Product } from './CartContext';
import { useProducts } from './ProductContext';
import { WishlistButton } from './WishlistButton';

export function Collections() {
  const { addToCart } = useCart();
  const { products, categories: allCategories } = useProducts();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) setSelectedCategory(catParam);
    
    const sizeParam = params.get('size');
    if (sizeParam) setSelectedSize(sizeParam);
  }, [location.search]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSize = selectedSize === "All" || (product.sizes && product.sizes.includes(selectedSize));
    return matchesCategory && matchesSize;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_low_high") return a.price - b.price;
    if (sortBy === "price_high_low") return b.price - a.price;
    return 0; // "newest" leaves it as in original data
  });

  const categories = ["All", ...allCategories];
  const sizes = ["All", "M", "L", "XL", "XXL"];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4 font-display"
          >
            All Collections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-8"
          >
            Explore our full range of carefully curated pieces. Once they're gone, they're gone forever.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-full overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-[var(--color-brand-accent)] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-full overflow-x-auto max-w-full">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${selectedSize === size ? 'bg-[var(--color-brand-accent)] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {size === "All" ? "All Sizes" : size}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-gray-200">
          <p className="font-bold text-gray-500">{sortedProducts.length} Items found</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-500 text-sm">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 border-none outline-none text-brand-black px-4 py-2 rounded-full font-bold text-sm cursor-pointer hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-[var(--color-brand-accent)]"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSelectedSize("All"); }}
              className="mt-6 px-6 py-2 bg-gray-200 text-brand-black rounded-full font-bold hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ProductCard: React.FC<{ product: Product; idx: number }> = ({ product, idx }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col h-full bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg p-3 sm:p-4 group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-xl overflow-hidden mb-3 md:mb-4">
        <img 
          src={images[currentImageIndex]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        
        <WishlistButton 
          product={product} 
          className="opacity-100 md:opacity-0 md:group-hover:opacity-100" 
        />

        {product.soldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none z-10">
            <span className="bg-white text-black px-6 py-3 font-black tracking-widest uppercase text-2xl md:text-3xl border-4 border-black rotate-[-10deg] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Sold Out</span>
          </div>
        )}

        {images.length > 1 && !product.soldOut && (
          <>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={prevImage} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-black p-1.5 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={nextImage} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-black p-1.5 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronRight size={16} />
            </motion.button>
          </>
        )}
      </Link>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-end mb-1 md:mb-2">
          {product.sizes && product.sizes.length > 0 && (
            <div className="text-[#FF4500] font-black text-sm md:text-base tracking-widest uppercase">
              {product.sizes[0]}
            </div>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-xl md:text-2xl text-white mb-0.5 leading-tight hover:text-[#FF4500] transition-colors">{product.title}</h3>
        </Link>
        <p className="text-gray-400 text-sm md:text-base font-medium mb-2 md:mb-3">Premium Quality</p>

        <div className="text-[#FF4500] font-black text-2xl md:text-3xl mt-auto flex items-baseline gap-1">
          <span>৳</span>{product.price.toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
}
