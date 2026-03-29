
import React from 'react';

interface MenuItem {
  label: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuPanelProps {
  panelRef: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  onResizeStart: () => void;
  onResizeKeyboard: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  isResizing: boolean;
  panelWidth: number;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  displayItemNumbering: boolean;
  displaySocials: boolean;
  socialItems: SocialItem[];
}

export const StaggeredMenuPanel: React.FC<StaggeredMenuPanelProps> = ({
  panelRef,
  open,
  onResizeStart,
  onResizeKeyboard,
  isResizing,
  panelWidth,
  items,
  onItemClick,
  displayItemNumbering,
  displaySocials,
  socialItems
}) => {
  return (
    <aside ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
      <div 
        className={`sm-resize-handle ${isResizing ? 'is-resizing' : ''}`}
        onMouseDown={onResizeStart}
        role="slider"
        aria-label="Resize menu"
        aria-valuemin={340}
        aria-valuemax={typeof window !== 'undefined' ? window.innerWidth * 0.8 : 1200}
        aria-valuenow={panelWidth}
        tabIndex={0}
        onKeyDown={onResizeKeyboard}
      />
      <div className="sm-panel-inner">
        <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
          {items.map((it, idx) => (
            <li className="sm-panel-itemWrap" key={idx}>
              <a className="sm-panel-item" href={it.link} onClick={(e) => { e.preventDefault(); onItemClick(it); }}>
                <span className="sm-panel-itemLabel">{it.label}</span>
              </a>
            </li>
          ))}
        </ul>
        
        {displaySocials && socialItems.length > 0 && (
          <div className="sm-socials">
            <h3 className="sm-socials-title">node_protocols</h3>
            <ul className="sm-socials-list">
              {socialItems.map((s, i) => (
                <li key={i} className="sm-social-node">
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};
