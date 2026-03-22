'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/context/WindowManager';

export interface WindowProps {
  id: string;
  title: string;
  icon: string;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  menuItems?: string[];
  statusBar?: string;
  children: React.ReactNode;
}

export default function Window({
  id, title, icon, defaultPos, defaultSize, zIndex, isOpen, isMinimized, isMaximized, menuItems, statusBar, children
}: WindowProps) {
  const { topZ, focusWindow, minimizeWindow, maximizeWindow, closeWindow } = useWindowManager();
  const [pos, setPos] = useState(defaultPos);
  const [isOpening, setIsOpening] = useState(true);
  
  const isFocused = zIndex === topZ;

  const dragOrigin = useRef<{ mx: number, my: number, wx: number, wy: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    dragOrigin.current = {
      mx: e.clientX,
      my: e.clientY,
      wx: pos.x,
      wy: pos.y
    };

    const handleMove = (ev: MouseEvent) => {
      if (!dragOrigin.current) return;
      
      const newX = dragOrigin.current.wx + (ev.clientX - dragOrigin.current.mx);
      const newY = dragOrigin.current.wy + (ev.clientY - dragOrigin.current.my);
      
      setPos({
        x: Math.max(0, newX),
        y: Math.max(0, newY)
      });
    };

    const handleUp = () => {
      dragOrigin.current = null;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };


  const outerStyle: React.CSSProperties = isMaximized ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: '28px',
    zIndex
  } : {
    position: 'absolute',
    left: pos.x,
    top: pos.y,
    width: defaultSize.w,
    height: defaultSize.h,
    zIndex
  };

  return (
    <AnimatePresence>
      {(isOpen && !isMinimized) && (
        <motion.div 
          className="w95-win"
          style={outerStyle as any}
          onMouseDown={() => focusWindow(id)}
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
        >
      <div 
        className={`w95-titlebar ${isFocused ? 'active' : 'inactive'}`}
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="w95-titlebar-left">
          <img 
            src={icon} 
            alt={title} 
            className="w95-tbar-icon"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
          />
          <span className="w95-tbar-title">{title}</span>
        </div>
        
        <div className="w95-win-btns">
          <button className="w95-wb" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}>_</button>
          <button className="w95-wb" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}>
            {isMaximized ? '❐' : '□'}
          </button>
          <button className="w95-wb" style={{ fontWeight: 'bold' }} onClick={(e) => { e.stopPropagation(); closeWindow(id); }}>
            ✕
          </button>
        </div>
      </div>
      
      {menuItems && menuItems.length > 0 && (
        <div className="w95-menubar">
          {menuItems.map(item => (
            <span key={item} className="w95-mitem">{item}</span>
          ))}
        </div>
      )}
      
      <div className="w95-content">
        {children}
      </div>
      
      {statusBar !== undefined && (
        <div className="w95-statusbar">
          <span className="w95-status-text">{statusBar}</span>
        </div>
      )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
