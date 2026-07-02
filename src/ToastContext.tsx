import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-24 left-6 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto backdrop-blur-md text-white border ${
                toast.type === 'success' ? 'bg-green-600/90 border-green-500/50' : 
                toast.type === 'error' ? 'bg-red-600/90 border-red-500/50' : 
                'bg-gray-800/90 border-gray-700/50'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 size={24} className="text-green-300" />}
              {toast.type === 'error' && <XCircle size={24} className="text-red-300" />}
              {toast.type === 'info' && <Info size={24} className="text-gray-300" />}
              
              <span className="flex-grow font-medium text-sm">{toast.message}</span>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
