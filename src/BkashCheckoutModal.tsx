import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { useCart } from './CartContext';

export function BkashCheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [bKashNumber, setBKashNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);

  const MERCHANT_NUMBER = "01925065283";

  const handleCopy = () => {
    navigator.clipboard.writeText(MERCHANT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bKashNumber && trxId) {
      setStep(3);
    }
  };

  const handleComplete = () => {
    clearCart();
    onClose();
    setTimeout(() => {
      setStep(1);
      setBKashNumber('');
      setTrxId('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-brand-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#E2136E] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#E2136E]" fill="currentColor">
                    <path d="M49.6,18.7L25.2,33v28.8L49.6,76l24.4-14.2V33L49.6,18.7z M65,58.4l-15.4,9L34.1,58.4v-18l15.4-9l15.4,9V58.4z"/>
                    <circle cx="49.6" cy="49.4" r="8"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight">bKash Payment</h3>
                  <p className="text-white/80 text-sm">Secure Checkout</p>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={24} />
              </motion.button>
            </div>

            <div className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Total Amount to Pay</p>
                    <p className="text-4xl font-bold text-brand-black font-display">৳{cartTotal}</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <p className="text-sm text-gray-500 font-medium mb-2">1. Send Money to this bKash Number</p>
                    <div className="flex items-center justify-between bg-brand-white border border-gray-200 p-3 rounded-xl mb-4">
                      <span className="font-bold text-xl tracking-wider text-brand-black">{MERCHANT_NUMBER}</span>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="text-[#E2136E] font-medium flex items-center gap-1 hover:bg-[#E2136E]/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy'}
                      </motion.button>
                    </div>
                    
                    <p className="text-sm text-gray-500 font-medium mb-1">2. Keep your Transaction ID (TrxID) ready</p>
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(2)}
                    className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c91262] transition-colors"
                  >
                    I have sent the money
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your bKash Account Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 017XXXXXX"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E2136E]/50 focus:border-[#E2136E] transition-all"
                      value={bKashNumber}
                      onChange={(e) => setBKashNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Transaction ID (TrxID)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 8JL5DF8P"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E2136E]/50 focus:border-[#E2136E] transition-all uppercase"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-2/3 bg-[#E2136E] text-white py-4 rounded-xl font-bold hover:bg-[#c91262] transition-colors"
                    >
                      Verify Payment
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 gap-4"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold font-display">Payment Successful!</h3>
                  <p className="text-gray-500 mb-4">Your order has been placed. We have received ৳{cartTotal} from your bKash account.</p>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="w-full bg-brand-black text-brand-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
