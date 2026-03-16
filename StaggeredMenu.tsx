
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { StaggeredMenuHeader } from './StaggeredMenuHeader';
import { StaggeredMenuPanel } from './StaggeredMenuPanel';
import './StaggeredMenu.css';

interface MenuItem {
  label: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  accentColor?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onLogoClick?: () => void;
  onJoinClick?: () => void;
  onItemClick?: (item: MenuItem) => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#1a1a1a', '#0a0a0a', '#000000'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  onLogoClick,
  onJoinClick,
  onItemClick
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLDivElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const [textLines, setTextLines] = useState(['MENU', 'CLOSE']);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelWidthRef = useRef(400);
  const rafIdRef = useRef<number>(0);
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLDivElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll<HTMLDivElement>('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -101 : 101;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -101 : 101;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    
    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, opacity: 0 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, x: -20 });
    if (socialLinks.length) gsap.set(socialLinks, { x: -30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => tl.to(ls.el, { xPercent: 0, duration: 0.8, ease: 'expo.inOut' }, i * 0.08));
    tl.to(panel, { xPercent: 0, duration: 0.8, ease: 'expo.inOut' }, (layerStates.length) * 0.08);

    if (itemEls.length) {
      tl.to(itemEls, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.05 }, "-=0.3");
      if (numberEls.length) tl.to(numberEls, { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: 0.05 }, "-=0.5");
    }
    if (socialTitle) tl.to(socialTitle, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4");
    if (socialLinks.length) tl.to(socialLinks, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.04 }, "-=0.3");

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else { busyRef.current = false; }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const all = [...layers, panel].reverse();
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -101 : 101;
    closeTweenRef.current = gsap.to(all, { xPercent: offscreen, duration: 0.7, ease: 'expo.inOut', stagger: 0.05, onComplete: () => { busyRef.current = false; } });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out' });
    else spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.6, ease: 'power3.inOut' });
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) {
      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      colorTweenRef.current = gsap.to(btn, { color: targetColor, duration: 0.4, ease: 'power2.out' });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const targetLabel = opening ? 'CLOSE' : 'MENU';
    const seq = [opening ? 'MENU' : 'CLOSE', targetLabel, targetLabel];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -finalShift, duration: 0.7, ease: 'power4.out' });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) { onMenuOpen?.(); playOpen(); }
    else { onMenuClose?.(); playClose(); }
    animateIcon(target); animateColor(target); animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false; setOpen(false);
      onMenuClose?.(); playClose();
      animateIcon(false); animateColor(false); animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  const startResizing = useCallback(() => {
    isResizingRef.current = true;
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // ⚡ Bolt: Optimize high-frequency mousemove events by bypassing React state.
    // Instead of using setPanelWidth, we use a ref and update the CSS variable directly.
    // This prevents expensive layout thrashing and re-renders during the drag action.
    rafIdRef.current = requestAnimationFrame(() => {
      let newWidth = position === 'right' ? window.innerWidth - e.clientX : e.clientX;
      const minWidth = 340;
      const maxWidth = window.innerWidth * 0.8;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        panelWidthRef.current = newWidth;
        if (wrapperRef.current) {
          wrapperRef.current.style.setProperty('--sm-panel-width', `${newWidth}px`);
        }
      }
      rafIdRef.current = 0;
    });
  }, [position]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={wrapperRef}
      className={`${className} staggered-menu-wrapper ${isFixed ? 'fixed-wrapper' : ''}`}
      style={{ '--sm-accent': accentColor, '--sm-panel-width': `${panelWidthRef.current}px` } as React.CSSProperties}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />)}
      </div>
      
      <StaggeredMenuHeader 
        onLogoClick={() => { onLogoClick?.(); closeMenu(); }}
        onJoinClick={onJoinClick}
        toggleMenu={toggleMenu}
        open={open}
        toggleBtnRef={toggleBtnRef}
        textInnerRef={textInnerRef}
        iconRef={iconRef}
        plusHRef={plusHRef}
        plusVRef={plusVRef}
        textLines={textLines}
      />

      <StaggeredMenuPanel 
        panelRef={panelRef}
        open={open}
        onResizeStart={startResizing}
        isResizing={isResizing}
        items={items}
        onItemClick={(it) => { onItemClick?.(it); closeMenu(); }}
        displayItemNumbering={displayItemNumbering}
        displaySocials={displaySocials}
        socialItems={socialItems}
      />
    </div>
  );
};

export default StaggeredMenu;
