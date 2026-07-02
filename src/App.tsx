import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Collections } from './Collections';
import { Footer } from './Footer';

import { ProductDetail } from './ProductDetail';
import { Contact } from './Contact';
import { About } from './About';
import { AdminPanel } from './AdminPanel';
import { ScrollToTopButton } from './ScrollToTopButton';

import { ToastProvider } from './ToastContext';
import { WishlistProvider } from './WishlistContext';

const WHATSAPP_NUMBER = "+8801925065283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <ProductProvider>
            <CartProvider>
              <div className="min-h-screen bg-brand-white text-brand-black flex flex-col overflow-x-hidden">
                <Navbar />
                
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<AdminPanel />} />
                  </Routes>
                </div>
                
                <Footer />

                {/* Floating WhatsApp Button */}
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-[#25D366]/30 flex items-center gap-2 group"
                >
                  <MessageCircle size={32} />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium pr-0 group-hover:pr-2">
                    Message Us
                  </span>
                </a>

                <ScrollToTopButton />
              </div>
            </CartProvider>
          </ProductProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
