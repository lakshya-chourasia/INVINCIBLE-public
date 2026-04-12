import React, { useRef, useMemo } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", label }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // Memoize fallback label to prevent recalculation
  const fallbackLabel = useMemo(() => 'unit_id::0x' + Math.floor(Math.random() * 999), []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Use CSS variables to bypass React state updates for high-frequency events
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => divRef.current?.style.setProperty('--card-opacity', '1')}
      onMouseLeave={() => divRef.current?.style.setProperty('--card-opacity', '0')}
      className={`relative overflow-hidden glass-panel p-6 border-zinc-800 hover:border-zinc-700 transition-all duration-300 ${className}`}
    >
      <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-zinc-800 uppercase tracking-widest pointer-events-none">
        {label || fallbackLabel}
      </div>
      <div className="absolute -inset-px pointer-events-none transition-opacity duration-300" style={{
        background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(82, 39, 255, 0.1), transparent 40%)`,
        opacity: 'var(--card-opacity, 0)'
      } as React.CSSProperties} />
      {children}
    </div>
  );
};
