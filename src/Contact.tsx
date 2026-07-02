import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, MessageCircle, Instagram, Facebook, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = "+8801925065283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-white pb-24 pt-32">
      <div className="container mx-auto px-6 max-w-6xl relative z-20">
        
        {/* Contact Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Have a question or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-black text-brand-white p-10 md:p-12 rounded-[2.5rem] shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)]">
                  <MessageCircle size={24} /> 
                </span>
                Reach Out
              </h3>
              
              <ul className="space-y-8 text-gray-300 font-medium">
                <li className="flex items-start gap-5">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={20} className="text-white" />
                  </span>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Location</p>
                    <span className="text-white">Agargaon, Notun Rasta<br/>Dhaka 1207, Bangladesh</span>
                  </div>
                </li>
                <li className="flex items-center gap-5">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-white" />
                  </span>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Email</p>
                    <a href="mailto:vengari00@gmail.com" className="text-white hover:text-[var(--color-brand-accent)] transition-colors">vengari00@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-center gap-5">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-white" />
                  </span>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Phone</p>
                    <a href={WHATSAPP_LINK} className="text-white hover:text-[var(--color-brand-accent)] transition-colors">+880 1925-065283</a>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-gray-50 border border-gray-100 p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-center shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-4">Quick Connect</h3>
              <p className="text-gray-500 mb-10 text-lg">
                The fastest way to reach us is through WhatsApp. We're generally available 24/7 to answer your queries about products, sizing, or orders.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 group flex flex-col justify-center bg-brand-white border-2 border-transparent text-brand-black p-6 rounded-2xl hover:border-[#25D366] transition-all font-bold shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                      <MessageCircle size={28} />
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-[#25D366] transition-colors" />
                  </div>
                  <span className="text-xl">WhatsApp Us</span>
                  <span className="text-sm text-gray-500 font-normal mt-1">Instant reply</span>
                </a>

                <a 
                  href="mailto:vengari00@gmail.com" 
                  className="flex-1 group flex flex-col justify-center bg-brand-white border-2 border-transparent text-brand-black p-6 rounded-2xl hover:border-brand-black transition-all font-bold shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 text-brand-black flex items-center justify-center">
                      <Mail size={28} />
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-brand-black transition-colors" />
                  </div>
                  <span className="text-xl">Email Us</span>
                  <span className="text-sm text-gray-500 font-normal mt-1">For general queries</span>
                </a>
              </div>

              <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <h4 className="font-bold text-gray-700 text-lg">Follow us on Socials</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-14 h-14 rounded-full bg-brand-white shadow-sm border border-gray-100 text-brand-black flex items-center justify-center hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="https://www.facebook.com/share/1BkiPqkAVU/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-brand-white shadow-sm border border-gray-100 text-brand-black flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                    <Facebook size={28} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
