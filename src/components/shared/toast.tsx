'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let toastId = 0;
const listeners: Set<(toast: Toast) => void> = new Set();

function emit(toast: Toast) {
  listeners.forEach(fn => fn(toast));
}

export const toast = {
  success: (message: string) => emit({ id: ++toastId, type: 'success', message }),
  error: (message: string) => emit({ id: ++toastId, type: 'error', message }),
  warning: (message: string) => emit({ id: ++toastId, type: 'warning', message }),
};

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const COLORS = {
  success: 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669]',
  error: 'bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626]',
  warning: 'bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706]',
};

export default function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([]);

  const addToast = useCallback((t: Toast) => {
    setItems(prev => [...prev, t]);
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== t.id)), 4000);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => { listeners.delete(addToast); };
  }, [addToast]);

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm">
      {items.map(item => {
        const Icon = ICONS[item.type];
        return (
          <div key={item.id} className={`rounded-xl px-5 py-3 shadow-lg flex items-center gap-3 text-sm font-medium animate-in slide-in-from-right ${COLORS[item.type]}`}>
            <Icon className="w-5 h-5 shrink-0" />
            <p className="flex-1">{item.message}</p>
            <button onClick={() => remove(item.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}