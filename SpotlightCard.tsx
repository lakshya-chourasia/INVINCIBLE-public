import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", label }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ⚡ Bolt: Avoid expensive React re-renders on high-frequency mousemove events
  // by using useRef and directly manipulating the DOM style instead of useState.
  return (
    <div
      onMouseMove={(e) => {
        if (!overlayRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        overlayRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(82, 39, 255, 0.1), transparent 40%)`;
      }}
      onMouseEnter={() => {
        if (overlayRef.current) overlayRef.current.style.opacity = '1';
      }}
      onMouseLeave={() => {
        if (overlayRef.current) overlayRef.current.style.opacity = '0';
      }}
      className={`relative overflow-hidden glass-panel p-6 border-zinc-800 hover:border-zinc-700 transition-all duration-300 ${className}`}
    >
      <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-zinc-800 uppercase tracking-widest pointer-events-none">
        {label || 'unit_id::0x' + Math.floor(Math.random() * 999)}
      </div>
      <div
        ref={overlayRef}
        className="absolute -inset-px pointer-events-none transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `radial-gradient(400px circle at 0px 0px, rgba(82, 39, 255, 0.1), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};
