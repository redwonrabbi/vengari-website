import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-white pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-brand-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1552554746-dbb5a9cdfb39?auto=format&fit=crop&q=80&w=2000" 
            alt="Streetwear aesthetic" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black/90" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 mt-16"
        >
          <p className="text-[var(--color-brand-accent)] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">Our Story</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-6 tracking-tight">
            ABOUT VENGARI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Trend • Comfort • Expression
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 max-w-6xl -mt-16 relative z-20">
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <span className="font-bengali text-[20rem] font-bold leading-none">ভ</span>
              </div>
              <h2 className="font-bengali text-5xl font-bold mb-6 text-[var(--color-brand-accent)]">ভ্যানগাড়ি</h2>
              <p className="text-xl text-gray-800 font-medium leading-relaxed mb-6 relative z-10">
                Designed for the Youth. Our pieces are handpicked to make sure you stand out while feeling comfortable.
              </p>
              <p className="text-gray-500 text-lg relative z-10">
                Fashion is an expression, and we are your canvas.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-brand-beige p-10 md:p-14 rounded-[2.5rem] flex flex-col justify-center shadow-lg"
            >
              <h3 className="text-3xl font-bold text-brand-black mb-6">Our Philosophy</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Vengari, we believe that fashion doesn't have to be expensive to be premium. Our focus is on sourcing high-quality casual wear, streetwear, and vintage collections.
              </p>
              <p className="text-lg text-brand-black leading-relaxed font-bold">
                From thrift drops to exclusive new shirts, every item is selected with care. Once our curated thrift pieces are gone, they are gone forever.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
