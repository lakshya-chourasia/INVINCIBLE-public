
import React, { useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", label }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [op, setOp] = useState(0);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOp(1)}
      onMouseLeave={() => setOp(0)}
      className={`relative overflow-hidden glass-panel p-6 border-zinc-800 hover:border-zinc-700 transition-all duration-300 ${className}`}
    >
      <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-zinc-800 uppercase tracking-widest pointer-events-none">
        {label || 'unit_id::0x' + Math.floor(Math.random() * 999)}
      </div>
      <div className="absolute -inset-px pointer-events-none transition-opacity duration-300" style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(82, 39, 255, 0.1), transparent 40%)`,
        opacity: op
      }} />
      {children}
    </div>
  );
};
