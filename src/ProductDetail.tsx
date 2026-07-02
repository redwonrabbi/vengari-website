import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, ZoomIn, Heart } from 'lucide-react';
import { useCart } from './CartContext';
import { useProducts } from './ProductContext';
import { useWishlist } from './WishlistContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/collections" className="text-[var(--color-brand-accent)] hover:underline font-bold">
          &larr; Back to Collections
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <Link to="/collections" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-black mb-8 font-medium">
          <ArrowLeft size={20} /> Back to Collection
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-beige aspect-[4/5] rounded-3xl overflow-hidden relative cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsZoomed(true)}
              onTouchEnd={() => setIsZoomed(false)}
              onTouchMove={handleTouchMove}
            >
              {isZoomed ? (
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("${images[currentImageIndex]}")`,
                    backgroundPosition: `${position.x}% ${position.y}%`,
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ) : (
                <>
                  <img 
                    src={images[currentImageIndex]} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm pointer-events-none">
                    <ZoomIn size={24} />
                  </div>
                </>
              )}
              {product.soldOut && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center pointer-events-none z-10 transition-all">
                  <span className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-black tracking-widest uppercase text-3xl md:text-5xl lg:text-6xl border-[6px] border-black rotate-[-10deg] shadow-[6px_6px_0_0_rgba(0,0,0,1)]">Sold Out</span>
                </div>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[var(--color-brand-accent)]' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6">
              {product.category && (
                <span className="inline-block px-3 py-1 bg-brand-black/10 text-brand-black/70 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display">{product.title}</h1>
              <p className="text-2xl md:text-3xl font-bold text-[var(--color-brand-accent)]">৳{product.price}</p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
              {product.description}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold mb-3">Available Sizes</h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${selectedSize === size ? 'border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] bg-[var(--color-brand-accent)]/10' : 'border-brand-black/10 text-brand-black/80 bg-brand-black/5 hover:border-brand-black/20'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && <p className="text-red-500 text-sm font-bold mt-2">Please select a size before adding to cart.</p>}
              </div>
            )}

            <div className="flex gap-4">
              <motion.button 
                whileTap={{ scale: product.soldOut ? 1 : 0.95 }}
                disabled={product.soldOut}
                onClick={() => {
                  if (product.soldOut) return;
                  if (product.sizes && product.sizes.length > 0 && !selectedSize) {
                    setSizeError(true);
                    return;
                  }
                  addToCart(product, selectedSize || undefined);
                }}
                className={`flex-1 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-opacity shadow-xl ${product.soldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--color-brand-accent)] hover:opacity-90 shadow-[var(--color-brand-accent)]/20'}`}
              >
                {product.soldOut ? (
                  <>Sold Out</>
                ) : (
                  <><ShoppingBag size={24} /> Add to Cart</>
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                className={`w-[72px] flex items-center justify-center rounded-2xl border-2 transition-colors ${
                  isInWishlist(product.id) 
                    ? 'border-[#FF4500] text-[#FF4500] bg-[#FF4500]/10' 
                    : 'border-brand-black/10 text-brand-black/60 hover:border-brand-black/20'
                }`}
              >
                <Heart size={28} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
