'use client';
import React from 'react';
import { useWindowManager } from '@/context/WindowManager';

export default function AppsWindow() {
  const { openWindow } = useWindowManager();

  const apps = [
    { title: 'Projects', icon: '/icons/projects.svg', id: 'projects' },
    { title: 'Contact', icon: '/icons/contact.svg', id: 'contact' },
    { title: 'Music', icon: '/icons/music.svg', id: 'music' }
  ];

  return (
    <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '16px', fontFamily: 'var(--font-ui)', fontSize: '15px' }}>
        Select an application to launch:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '16px' }}>
        {apps.map(app => (
          <div 
            key={app.id} 
            className="w95-proj-icon" 
            style={{ cursor: 'pointer' }}
            onClick={() => openWindow(app.id)}
          >
            <img src={app.icon} alt={app.title} style={{ width: '32px', height: '32px', marginBottom: '8px' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#000', textAlign: 'center' }}>
              {app.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
