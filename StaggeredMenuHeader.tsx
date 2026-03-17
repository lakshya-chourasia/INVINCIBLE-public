
import React from 'react';
import { Command, UserPlus } from 'lucide-react';

interface StaggeredMenuHeaderProps {
  onLogoClick: () => void;
  onJoinClick?: () => void;
  toggleMenu: () => void;
  open: boolean;
  toggleBtnRef: React.RefObject<HTMLButtonElement | null>;
  textInnerRef: React.RefObject<HTMLSpanElement | null>;
  iconRef: React.RefObject<HTMLSpanElement | null>;
  plusHRef: React.RefObject<HTMLSpanElement | null>;
  plusVRef: React.RefObject<HTMLSpanElement | null>;
  textLines: string[];
}

export const StaggeredMenuHeader: React.FC<StaggeredMenuHeaderProps> = ({
  onLogoClick,
  onJoinClick,
  toggleMenu,
  open,
  toggleBtnRef,
  textInnerRef,
  iconRef,
  plusHRef,
  plusVRef,
  textLines
}) => {
  return (
    <header className="staggered-menu-header">
      <div 
        className="sm-logo liquid-glass" 
        onClick={onLogoClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLogoClick(); } }}
        role="button"
        tabIndex={0}
        aria-label="Home"
        data-glitch={open || undefined}
      >
        <Command className="sm-logo-icon" />
        <span className="ml-3 text-[10px] font-black uppercase tracking-[0.4em] text-white hidden sm:inline">Invincible_v2</span>
      </div>
      
      <div className="sm-header-actions">
        <button className="sm-join-btn liquid-glass purple-liquid-glass" onClick={onJoinClick} aria-label="Join Collective">
          <UserPlus className="w-3 h-3 mr-2" />
          JOIN_COLLECTIVE
        </button>

        <button
          ref={toggleBtnRef}
          className="sm-toggle liquid-glass"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => <span className="sm-toggle-line" key={i}>{l}</span>)}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </div>
    </header>
  );
};
