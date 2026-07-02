import React from 'react';
import { MapPin, Mail, MessageCircle, Instagram, Facebook, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = "+8801925065283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-black text-brand-white pt-20 pb-10 px-6">
      <div className="container mx-auto grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-16 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-bengali text-3xl font-bold">ভ্যানগাড়ি</span>
          </div>
          <p className="text-gray-400 mb-6">Trend • Comfort • Expression.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#25D366] transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E1306C] transition-colors"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/share/1BkiPqkAVU/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="shrink-0 mt-1" size={20} />
              <span>Agargaon, Notun Rasta<br/>Dhaka 1207, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="shrink-0" size={20} />
              <a href="mailto:vengari00@gmail.com" className="hover:text-brand-beige">vengari00@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0" size={20} />
              <a href={WHATSAPP_LINK} className="hover:text-brand-beige">+880 1925-065283</a>
            </li>
            <li className="flex items-center gap-3 pt-2 text-brand-beige font-medium">
              <CheckCircle2 className="shrink-0" size={20} />
              We are open 24/7
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex justify-between items-center bg-gray-900 border border-gray-800 px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors">
              <span>Chat on WhatsApp</span>
              <ArrowRight size={18} />
            </a>
            <a href="/admin" className="flex justify-between items-center bg-gray-900 border border-gray-800 px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors">
              <span>Admin Panel</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Vengari (ভ্যানগাড়ি). All rights reserved.</p>
        <p>Designed for the Youth.</p>
      </div>
    </footer>
  );
}
