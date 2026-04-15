import React from "react";
import { motion } from "framer-motion";

interface CircularProgressBarProps {
  progress: number; // 0 to 1
  minutesLabel: string;
  subLabel: string;
}

export const CircularProgressBar = ({ progress, minutesLabel, subLabel }: CircularProgressBarProps) => {
  const size = 320;
  const strokeWidth = 28;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-[0_0_15px_rgba(255,152,0,0.15)]">
        <defs>
          {/* Çizgili Desen (Striped Pattern) */}
          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="4"
            />
          </pattern>
          
          {/* Maskeleme (Progress'e Deseni Uygulamak İçin) */}
          <mask id="progress-mask">
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke="white"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Arka Plan Halkası */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#121212"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Ana Turuncu Dolgu */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#ff9c07"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />

        {/* Üzerindeki Çizgiler (Maskelenmiş) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#stripes)"
          strokeWidth={strokeWidth}
          fill="none"
          mask="url(#progress-mask)"
        />
      </svg>

      {/* Merkezi Metin Alanı */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[68px] font-black leading-none tracking-tighter text-white"
        >
          {minutesLabel}
        </motion.span>
        <div className="mt-2 space-y-0.5">
          {subLabel.split("\n").map((line, i) => (
            <p key={i} className="text-gray-400 font-bold text-[18px] leading-tight flex flex-col">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
