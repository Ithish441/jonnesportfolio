'use client';
import React, { useState, useEffect } from 'react';
import { useWindowManager } from '@/context/WindowManager';

export default function Taskbar() {
  const { windows, openWindow, minimizeWindow, focusWindow, topZ } = useWindowManager();
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => setTime(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWindowClick = (id: string, isMin: boolean, z: number) => {
    if (isMin) {
      minimizeWindow(id);
      focusWindow(id);
    } else if (z !== topZ) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  };

  const openApp = (id: string) => {
    openWindow(id);
    setStartOpen(false);
  };

  return (
    <>
      <div className="w95-taskbar">
        <button 
          className={`w95-start-btn ${startOpen ? 'pressed' : ''}`}
          onClick={() => setStartOpen(!startOpen)}
        >
          <div className="w95-flag">
            <div></div><div></div><div></div><div></div>
          </div>
          Start
        </button>

        <div className="w95-taskbar-sep"></div>

        <div className="w95-taskbar-btns">
          {windows.filter(w => w.isOpen).map(w => (
            <button
              key={w.id}
              className={`w95-tb-btn ${(!w.isMinimized && w.zIndex === topZ) ? 'focused' : ''}`}
              onClick={() => handleWindowClick(w.id, w.isMinimized, w.zIndex)}
            >
              <img src={w.icon} alt={w.title} style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.title}</span>
            </button>
          ))}
        </div>

        <div className="w95-tray">
          <span>{time}</span>
        </div>
      </div>

      {startOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9997 }} onClick={() => setStartOpen(false)}></div>
          <div className="w95-start-menu">
            <div className="w95-sm-banner">
              <span>Windows 95</span>
            </div>
            <div className="w95-sm-items">
              <div className="w95-sm-item" onClick={() => openApp('about')}>
                <img src="/icons/computer_explorer-4.png" alt="Programs" /> My Computer
              </div>
              <div className="w95-sm-item" onClick={() => openApp('projects')}>
                <img src="/icons/directory_open_file_mydocs-4.png" alt="Documents" /> Projects
              </div>
              <div className="w95-sm-item" onClick={() => openApp('contact')}>
                <img src="/icons/computer_buddy-4.png" alt="Settings" /> Contact
              </div>
              <div className="w95-sm-div"></div>
              <div className="w95-sm-item" onClick={() => window.close()}>
                <img src="/icons/shut_down-4.png" alt="Shut Down" /> Shut Down...
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
