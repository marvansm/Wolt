"use client";

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { theme: content } = useIntlayer("features");
  if (!content) return null;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-[#202020] w-[380px] rounded-2xl p-6 relative shadow-2xl border border-white/10 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={18} className="text-white" />
            </button>

            <h2 className="text-white text-[28px] font-extrabold mb-8 tracking-tight mt-2">{content.title as any}</h2>

            <div className="flex bg-[#333333] rounded-lg p-1 mb-8">
              {(['auto', 'light', 'dark', 'high-contrast'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                    theme === t
                      ? 'bg-black text-white border border-[#0099ff] shadow-sm'
                      : 'text-[#b3b3b3] hover:text-white border border-transparent'
                  }`}
                >
                  {t === 'auto' && content.auto}
                  {t === 'light' && content.light}
                  {t === 'dark' && content.dark}
                  {t === 'high-contrast' && content.highContrast}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#0099ff] hover:bg-[#0088e6] text-white font-bold py-3.5 rounded-xl transition-colors text-[15px]"
            >
              {content.done as any}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
