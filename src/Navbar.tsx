import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Plus, Minus, ArrowRight, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { BkashCheckoutModal } from './BkashCheckoutModal';

const WHATSAPP_NUMBER = "+8801925065283";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBkashModalOpen, setIsBkashModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { cart, removeFromCart, updateQuantity, cartTotal, subtotal, discount } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Default to dark mode
    document.documentElement.classList.add('dark');
    setIsDarkMode(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `Hello Vengari! I'd like to place an order:%0A%0A`;
    cart.forEach(item => {
      const sizeStr = item.selectedSize ? ` (Size: ${item.selectedSize})` : '';
      msg += `- ${item.title}${sizeStr} (x${item.quantity}) - ৳${item.price * item.quantity}%0A`;
    });
    if (discount > 0) {
      msg += `%0ASubtotal: ৳${subtotal}%0ACombo Discount: -৳${discount}%0ATotal: ৳${cartTotal}%0A%0APlease let me know the next steps!`;
    } else {
      msg += `%0ATotal: ৳${cartTotal}%0A%0APlease let me know the next steps!`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${msg}`;
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-brand-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Vengari Logo" className="h-10 md:h-12 object-contain" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              if ((e.target as HTMLImageElement).nextElementSibling) {
                 ((e.target as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'inline';
              }
            }} />
            <span className="font-bengali text-2xl md:text-3xl font-bold tracking-tight hidden">ভ্যানগাড়ি</span>
            <span className="hidden md:inline text-sm font-medium border border-brand-black px-2 py-0.5 rounded-full">(Vengari)</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link to="/collections" className="hover:text-gray-600 transition-colors">Collections</Link>
            <Link to="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            <Link to="/about" className="hover:text-gray-600 transition-colors">About Us</Link>
            
            <div className="flex items-center gap-2 border-l border-gray-200 pl-8">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-brand-black"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative bg-brand-black text-brand-white p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-brand-accent)] text-white text-xs w-5 h-5 flex flex-col justify-center items-center rounded-full font-bold">
                    {cartItemCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-brand-black"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
            >
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute 0 top-0 right-0 bg-[var(--color-brand-accent)] text-white text-xs w-5 h-5 flex flex-col justify-center items-center rounded-full font-bold">
                  {cartItemCount}
                </span>
              )}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-brand-white pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-medium border-b border-gray-200 pb-4">Home</Link>
            <Link to="/collections" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-medium border-b border-gray-200 pb-4">Collections</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-medium border-b border-gray-200 pb-4">Contact</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-medium border-b border-gray-200 pb-4">About Us</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-brand-white">
                <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                  <ShoppingBag size={24} /> Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                        <ShoppingBag size={48} className="opacity-20" />
                        <p>Your cart is empty</p>
                        <button onClick={() => setIsCartOpen(false)} className="text-brand-black font-medium border-b border-brand-black pb-1">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.cartItemId} className="flex gap-4 border-b border-gray-100 pb-6 mb-2">
                            <div className="w-24 h-24 bg-brand-beige rounded-xl overflow-hidden shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <X size={18} />
                                        </motion.button>
                                    </div>
                                    {item.selectedSize && <p className="text-sm font-bold text-gray-500 uppercase">Size: {item.selectedSize}</p>}
                                </div>
                                <div className="flex justify-between items-end mt-2">
                                    <p className="font-bold text-lg">৳{item.price}</p>
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="text-gray-600 hover:text-brand-black">
                                            <Minus size={16} />
                                        </motion.button>
                                        <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="text-gray-600 hover:text-brand-black">
                                            <Plus size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
              </div>

              {cart.length > 0 && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                      {discount > 0 && (
                          <>
                              <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                                  <span>Subtotal</span>
                                  <span>৳{subtotal}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2 text-sm text-[#E2136E] font-medium">
                                  <span>Combo Discount</span>
                                  <span>-৳{discount}</span>
                              </div>
                          </>
                      )}
                      <div className="flex justify-between items-center mb-6 text-lg">
                          <span className="font-medium text-gray-600">Total</span>
                          <span className="font-bold text-2xl font-display">৳{cartTotal}</span>
                      </div>
                      <div className="flex flex-col gap-3">
                          <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                  setIsCartOpen(false);
                                  setIsBkashModalOpen(true);
                              }}
                              className="w-full bg-[#E2136E] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#c91262] transition-colors shadow-lg shadow-[#E2136E]/20"
                          >
                              Pay with bKash
                          </motion.button>
                          
                          <motion.a 
                              whileTap={{ scale: 0.95 }}
                              href={generateWhatsAppMessage()} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all"
                          >
                              Checkout via WhatsApp <ArrowRight size={20} />
                          </motion.a>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-4">We will confirm your order availability via WhatsApp.</p>
                  </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <BkashCheckoutModal isOpen={isBkashModalOpen} onClose={() => setIsBkashModalOpen(false)} />
    </>
  );
}
