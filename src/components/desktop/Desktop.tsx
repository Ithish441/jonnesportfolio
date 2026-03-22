'use client';
import React, { useState, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from '@/context/WindowManager';
import { WIN95_CSS } from '../win95Styles';
import Taskbar from '../taskbar/Taskbar';
import Window from '../window/Window';

// Import apps
import AboutWindow from '../apps/AboutWindow';
import ProjectsWindow from '../apps/ProjectsWindow';
import ContactWindow from '../apps/ContactWindow';
import RecycleBinWindow from '../apps/RecycleBinWindow';
import AppsWindow from '../apps/AppsWindow';
import MusicWindow from '../apps/MusicWindow';
import InteractiveParticles from './InteractiveParticles';
import HeroMarquee from './HeroMarquee';

function StyleInjector() {
  useEffect(() => {
    let style = document.getElementById('win95-global-css');
    if (!style) {
      style = document.createElement('style');
      style.id = 'win95-global-css';
      style.innerHTML = WIN95_CSS;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

const APP_COMPONENTS: Record<string, React.ReactNode> = {
  about: <AboutWindow />,
  projects: <ProjectsWindow />,
  contact: <ContactWindow />,
  recycle: <RecycleBinWindow />,
  myapps: <AppsWindow />,
  music: <MusicWindow />
};

function DesktopInner() {
  const { windows, openWindow } = useWindowManager();
  const [ctxMenu, setCtxMenu] = useState<{ x: number, y: number } | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  // Custom Background Flashlight Tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleGlobalClick = () => {
    if (ctxMenu) setCtxMenu(null);
    setSelectedIcon(null);
  };

  const desktopIcons = [
    { id: 'about', label: 'About Me', img: '/icons/about.svg' },
    { id: 'myapps', label: 'My Apps', img: '/icons/myapps.svg' },
    { id: 'projects', label: 'Projects', img: '/icons/projects.svg' },
    { id: 'music', label: 'Music', img: '/icons/music.svg' },
    { id: 'contact', label: 'Contact', img: '/icons/contact.svg' },
    { id: 'recycle', label: 'Recycle Bin', img: '/icons/recycle.svg' },
  ];

  return (
    <div 
      className="w95 w95-desktop" 
      onClick={handleGlobalClick} 
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundColor: 'transparent',
        backgroundBlendMode: 'normal',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w95-canvas">
      
        {/* Glassmorphism Over Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          backgroundColor: 'transparent',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>

        {/* Blurred Subject Layer (Always Visible, Frosted Glass Effect) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/subject.png)',
          backgroundSize: 'auto 75%',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px) brightness(1.15) saturate(1.2)',
          opacity: 0.85,
          zIndex: 2,
          pointerEvents: 'none'
        }}></div>

        {/* Clear Subject Layer with Flashlight Reveal Mask */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/subject.png)',
          backgroundSize: 'auto 75%',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          maskImage: `radial-gradient(circle 550px at ${mousePos.x}px ${mousePos.y}px, black 15%, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(circle 550px at ${mousePos.x}px ${mousePos.y}px, black 15%, transparent 65%)`,
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'mask-position 0.1s ease-out, -webkit-mask-position 0.1s ease-out'
        }}></div>

        {/* 3 Lines of Marquee Text with Hover Wave Effect */}
        <HeroMarquee />

        {/* Desktop Icons */}
        <div style={{ 
          position: 'absolute', 
          bottom: '24px', 
          left: 0, 
          right: 0, 
          zIndex: 10, 
          padding: '16px', 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '8px', 
          justifyContent: 'center', 
          alignItems: 'flex-end' 
        }}>
          {desktopIcons.map(icon => (
            <div 
              key={icon.id}
               className={`w95-dicon ${selectedIcon === icon.id ? 'sel' : ''}`}
               onClick={(e) => { 
                 e.stopPropagation(); 
                 setSelectedIcon(icon.id); 
                 openWindow(icon.id);
               }}
             >
              <div className="w95-dicon-img-wrap">
                <img src={icon.img} alt={icon.label} style={{ imageRendering: 'auto', width: '48px', height: '48px' }} />
              </div>
              <span>{icon.label}</span>
            </div>
          ))}
        </div>

        {/* Windows rendering */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
           {windows.map(w => (
              <div key={w.id} style={{ pointerEvents: 'auto' }}>
                <Window {...w}>
                  {APP_COMPONENTS[w.id]}
                </Window>
              </div>
           ))}
        </div>
      </div>

      <Taskbar />

      {/* Context Menu */}
      {ctxMenu && (
        <div className="w95-ctx" style={{ left: ctxMenu.x, top: ctxMenu.y, zIndex: 9999 }} onClick={(e) => e.stopPropagation()}>
          <div className="w95-ctx-item" onClick={() => window.location.reload()}>Refresh Layout</div>
          <div className="w95-ctx-div"></div>
          <div className="w95-ctx-item" style={{ color: '#888' }}>Properties</div>
        </div>
      )}
    </div>
  );
}

export default function Desktop() {
  return (
    <WindowManagerProvider>
      <StyleInjector />
      <DesktopInner />
    </WindowManagerProvider>
  );
}
