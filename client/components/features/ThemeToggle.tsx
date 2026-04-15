"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch prevention
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary transition-all border border-border/50 shadow-sm relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === 'dark' ? 0 : 40,
          opacity: theme === 'dark' ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Moon className="w-5 h-5 text-blue-400" />
      </motion.div>
      
      <motion.div
        className="absolute top-2.5 left-2.5"
        initial={false}
        animate={{
          y: theme === 'light' ? 0 : -40,
          opacity: theme === 'light' ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Sun className="w-5 h-5 text-yellow-500" />
      </motion.div>
    </button>
  );
}
