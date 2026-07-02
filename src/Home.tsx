import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, MapPin, Mail, MessageCircle, 
  Star, ChevronDown, CheckCircle2, ShoppingBag, Instagram, Facebook, Info, Shirt
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useProducts } from './ProductContext';
import { WishlistButton } from './WishlistButton';

const RealisticCategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  const lower = category.toLowerCase();

  // Pants/Trousers/Denim
  if (lower.includes('pan') || lower.includes('trouser') || lower.includes('jean') || lower.includes('denim') || lower.includes('baggy')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 4H16L18 21H13.5L12 11L10.5 21H6L8 4Z" />
        <path d="M12 4V11" />
        <path d="M9 4V7 M15 4V7" />
      </svg>
    );
  }

  // Caps
  if (lower.includes('cap') || lower.includes('hat')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 15A7 7 0 0 1 19 15Z" />
        <path d="M2 15C5 13 19 13 22 15C22.5 16.5 20.5 16.5 19.5 16.5H4.5C3.5 16.5 1.5 16.5 2 15Z" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // Winter / Hoodie
  if (lower.includes('winter') || lower.includes('hoodie')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 6L4 8L3 14L6 15L7 12L7 21H17L17 12L18 15L21 14L20 8L14 6" />
        <path d="M10 6C10 2 14 2 14 6" />
        <path d="M11 6V9 M13 6V9" />
        <path d="M8 15H16L15 19H9Z" />
      </svg>
    );
  }

  // T-Shirt pattern
  if (lower.includes('jersey') || lower.includes('t-shirt') || lower.includes('t shirt') || lower.includes('polo')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 4.5V2C12 1 13.5 1 13.5 2" />
        <path d="M10 5L4 7L3 12L6 13L7 10L7 21H17L17 10L18 13L21 12L20 7L14 5" />
        <path d="M10 5C10 6.5 14 6.5 14 5" />
        <path d="M10 5C11 4.5 13 4.5 14 5" />
      </svg>
    );
  }

  // Default / Button-up (New, Thrift)
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 4.5V2C12 1 13.5 1 13.5 2" />
      <path d="M9 5L4 7L3 13L6 14L7 10.5L7 21H17L17 10.5L18 14L21 13L20 7L15 5" />
      <path d="M9 5L7.5 8L12 6.5L16.5 8L15 5" />
      <path d="M9 5C10.5 4 13.5 4 15 5" />
      <line x1="12" y1="6.5" x2="12" y2="21" />
    </svg>
  );
};

const WHATSAPP_NUMBER = "+8801925065283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;

export function Home() {
  const { addToCart } = useCart();
  const { products, categories } = useProducts();

  const LATEST_DROPS = products.slice(0, 6);

const MotionLink = motion(Link);

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden px-6 lg:px-12 bg-brand-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-10"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-brand-beige px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-8 shadow-sm border border-brand-black/5"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)]"></span>
                  Dhaka's Premium Thrift
                </motion.div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
                  Style That <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black to-gray-500">Speaks.</span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 leading-snug max-w-lg font-medium">
                  Discover handpicked thrift shirts that blend trend, comfort, and expression. <span className="font-bengali font-bold text-brand-black">ভ্যানগাড়ি</span> is your destination for authentic style.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                  <MotionLink 
                    to="/collections" 
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-brand-black text-brand-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_10px_40px_rgba(30,30,36,0.3)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <ShoppingBag size={22} className="stroke-[2.5]" />
                    Shop Now
                  </MotionLink>
                  <motion.a 
                    href={WHATSAPP_LINK} 
                    target="_blank" 
                    rel="noreferrer" 
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-brand-beige text-brand-black px-10 py-5 rounded-full font-bold text-lg hover:bg-[#e6ddc5] transition-colors duration-300 group"
                  >
                    Message Us
                    <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=2070" 
                    alt="Man in stylish streetwear" 
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Floating Elements on Image */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
                        <Star className="fill-black text-black" size={24} />
                      </div>
                      <div>
                        <p className="text-black font-bold text-lg leading-tight">Top Quality</p>
                        <p className="text-[#E94F37] font-bold text-sm">Checked & Washed</p>
                      </div>
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full font-bold shadow-md">
                      Starts from ৳450
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-brand-accent)] rounded-full blur-[80px] opacity-20 -z-10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-brand-accent)] rounded-full blur-[80px] opacity-20 -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scrolling Banner */}
        <div className="bg-[var(--color-brand-accent)] text-white py-5 flex whitespace-nowrap overflow-hidden shadow-inner">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex items-center gap-12 text-2xl md:text-3xl font-display font-bold uppercase tracking-wider px-6"
          >
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-12">
                  <span>Order 2 gets Combo offer</span>
                  <Star className="fill-white" size={24} />
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Shop by Category */}
        <section className="pt-24 pb-12 px-6 bg-brand-black text-brand-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4500] font-bold tracking-widest uppercase text-sm mb-2 block">Browse</span>
              <h2 className="text-4xl lg:text-5xl font-bold">Shop by Category</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
              {(() => {
                return [
                  ...categories.map((cat, i) => ({
                    type: 'category',
                    name: cat
                  })),
                  ...['L', 'XL', 'XXL'].map((size, i) => ({
                    type: 'size',
                    name: size
                  }))
                ];
              })().map((item, idx) => (
                <Link 
                  to={item.type === 'category' ? `/collections?category=${encodeURIComponent(item.name)}` : `/collections?size=${item.name}`} 
                  key={idx} 
                  className="flex flex-col items-center group w-20 sm:w-24 lg:w-32"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-brand-white rounded-full flex items-center justify-center mb-3 sm:mb-4 border-2 border-transparent group-hover:border-[#FF4500] transition-all duration-300 relative shadow-xl shadow-black/50 group-hover:-translate-y-2">
                    {item.type === 'category' ? (
                      <RealisticCategoryIcon category={item.name} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-brand-black group-hover:text-[#FF4500] transition-colors duration-300" />
                    ) : (
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-black group-hover:text-[#FF4500] transition-colors duration-300">
                        {item.name}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-center text-xs sm:text-sm text-gray-300 group-hover:text-brand-accent uppercase tracking-wider leading-tight">
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 px-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Drops</h2>
                <p className="text-gray-600 text-lg">Curated shirts, one piece only. Once they're gone, they're gone.</p>
              </div>
              <Link to="/collections" className="flex items-center gap-2 font-bold group">
                Browse Full Collection 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {LATEST_DROPS.map((product, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  key={product.id} 
                  className="flex flex-col h-full bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg p-3 sm:p-4 group"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-xl overflow-hidden mb-3 md:mb-4">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <WishlistButton 
                      product={product} 
                      className="opacity-100 md:opacity-0 md:group-hover:opacity-100" 
                    />
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none z-10">
                        <span className="bg-white text-black px-6 py-3 font-black tracking-widest uppercase text-2xl md:text-3xl border-4 border-black rotate-[-10deg] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Sold Out</span>
                      </div>
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
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <MotionLink 
                to="/collections" 
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-accent)] text-white px-10 py-4 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-[var(--color-brand-accent)]/20"
              >
                View All Collections
              </MotionLink>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-brand-beige overflow-hidden">
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 relative"
            >
              <div className="grid grid-cols-2 gap-4 perspective-[1000px]">
                <motion.img 
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src="https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=1976" 
                  alt="Man in vintage plaid shirt" 
                  className="w-full h-64 object-cover rounded-2xl md:mt-8 shadow-md hover:shadow-xl [transform-style:preserve-3d]"
                />
                <motion.img 
                  whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5, z: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2073" 
                  alt="Man in streetwear" 
                  className="w-full h-80 object-cover rounded-2xl shadow-md hover:shadow-xl [transform-style:preserve-3d]"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="font-bengali">ভ্যানগাড়ি</span></h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  ভ্যানগাড়ি started in 2025 with a simple idea — <strong className="text-brand-black">great fashion shouldn't be expensive</strong>. Based in Dhaka, we bring you carefully selected thrift shirts that combine modern trends, everyday comfort, and personal expression.
                </p>
                <p>
                  Every piece in our collection is chosen to give you a unique style without compromising your budget. Whether you want something casual, bold, or minimal — we've got something for you.
                </p>
                <div className="pt-6 border-t border-gray-300">
                  <h3 className="font-bold text-brand-black mb-4 flex items-center gap-2">
                    <Star className="fill-brand-black" size={20} /> We believe:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-brand-black" /> Fashion is for everyone</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-brand-black" /> Style should be affordable</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-brand-black" /> Your outfit should express who you are</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery / Lookbook */}
        <section id="gallery" className="py-20 px-6 bg-brand-black text-brand-white overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-brand-beige">Vengari Life</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&q=80&w=1974" alt="Casual Men's Shirt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="font-bold text-xl text-white">Street Style</p>
                  <p className="text-gray-300">Dhaka Urban</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=2070" alt="Man in casual shirt" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=2070" alt="Cool styling" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="col-span-2 rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1974" alt="Men's Clothing Rack" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">Tag us on Instagram to be featured.</p>
              <a href="#" className="inline-flex items-center gap-2 font-bold hover:text-brand-beige transition-colors">
                <Instagram size={20} /> @vengari.bd
              </a>
            </div>
          </motion.div>
        </section>

        {/* Reviews & FAQ */}
        <section className="py-24 px-6 bg-brand-beige overflow-hidden">
          <div className="container mx-auto grid md:grid-cols-2 gap-20">
            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Star className="fill-brand-black" /> Customer Reviews
              </h2>
              <div className="space-y-6">
                <div className="bg-brand-white p-6 rounded-2xl shadow-sm">
                  <div className="flex text-[#FFB800] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                  </div>
                  <p className="text-lg font-medium mb-2">"Best thrift page in Dhaka!"</p>
                  <p className="text-gray-500 text-sm">— Rafiq M.</p>
                </div>
                <div className="bg-brand-white p-6 rounded-2xl shadow-sm">
                  <div className="flex text-[#FFB800] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                  </div>
                  <p className="text-lg font-medium mb-2">"Quality way better than expected. Will buy again!"</p>
                  <p className="text-gray-500 text-sm">— Nabila T.</p>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Info size={28} /> FAQ
              </h2>
              <div className="space-y-4">
                {[
                  { q: "Are items used?", a: "Yes, our items are pre-loved (thrifted), but each piece is carefully selected, washed, and thoroughly quality checked before being listed." },
                  { q: "Is delivery available?", a: "Yes! We deliver all over Bangladesh. Inside Dhaka: 60 BDT. Outside Dhaka: 120 BDT." },
                  { q: "How do I place an order?", a: "Add the items to your cart and checkout. This will generate a WhatsApp message with your order details." }
                ].map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-3xl"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Don't Miss Out!</h2>
            <p className="text-xl text-gray-600 mb-10">New styles drop regularly — and once they're gone, they're gone.</p>
            
            <div className="flex flex-col gap-4 text-lg font-medium mb-10 items-center">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-brand-black" /> Grab your favorite before it sells out</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-brand-black" /> Add to cart for quick order</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-brand-black" /> Stay stylish, stay unique</div>
            </div>

            <MotionLink 
              to="/collections" 
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#20bd5a] transition-all shadow-xl shadow-[#25D366]/20"
            >
              <ShoppingBag size={24} /> Shop Now
            </MotionLink>
          </motion.div>
        </section>
      </main>
    </>
  );
}

// Simple FAQ accordion component
function FAQItem({ question, answer }: { key?: React.Key, question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-xl bg-brand-white overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-4 font-bold flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
