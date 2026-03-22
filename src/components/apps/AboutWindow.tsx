'use client';
import React from 'react';
import { useWindowManager } from '@/context/WindowManager';

export default function AboutWindow() {
  const { openWindow } = useWindowManager();

  return (
    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Section A - Identity Row */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div 
          className="w95-sunken" 
          style={{ width: '88px', height: '88px', background: '#808080', position: 'relative', flexShrink: 0 }}
        >
          {/* Replace with <img src="/avatar.jpg" alt="Ithish Jonnes" style={{ width: 88, height: 88, objectFit: 'cover' }} /> */}
          <svg width="88" height="88" viewBox="0 0 60 72" fill="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
             {/* Head */}
             <rect x="18" y="4" width="24" height="22" rx="2" fill="#A0A0A0"/>
             {/* Eyes */}
             <rect x="22" y="12" width="4" height="4" fill="#606060"/>
             <rect x="34" y="12" width="4" height="4" fill="#606060"/>
             {/* Mouth */}
             <rect x="24" y="20" width="12" height="2" fill="#606060"/>
             {/* Body */}
             <rect x="10" y="28" width="40" height="28" rx="2" fill="#909090"/>
             {/* Arms */}
             <rect x="0" y="28" width="12" height="20" rx="2" fill="#909090"/>
             <rect x="48" y="28" width="12" height="20" rx="2" fill="#909090"/>
             {/* Legs */}
             <rect x="12" y="58" width="14" height="12" rx="1" fill="#888"/>
             <rect x="34" y="58" width="14" height="12" rx="1" fill="#888"/>
          </svg>
          <span style={{ position: 'absolute', bottom: '2px', left: 0, right: 0, textAlign: 'center', fontSize: '9px', color: '#C0C0C0' }}>
            add photo
          </span>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#000', lineHeight: 1 }}>Ithish Jonnes</div>
          <div style={{ height: '2px', background: '#808080', borderBottom: '1px solid #FFF', margin: '6px 0' }}></div>
          <div style={{ fontSize: '15px', color: '#000', lineHeight: 1.4 }}>Full-Stack Developer<br/>& Graphic Designer</div>
          <div style={{ fontSize: '14px', color: '#444', fontStyle: 'italic', marginTop: '4px' }}>&quot;I build things &amp; make them look good&quot;</div>
        </div>
      </div>

      {/* Section B - Bio text box */}
      <div className="w95-inset" style={{ padding: '6px 8px', background: '#FFF' }}>
        <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#000', margin: 0 }}>
          Hi! I&apos;m Ithish — I live at the intersection of clean code and sharp design. I build web apps that are fast, functional, and actually look good. Welcome to my OS. Double-click anything to explore.
        </p>
      </div>

      {/* Section C - Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="w95-btn" onClick={() => openWindow('projects')}>📁 Open Projects</button>
        <button className="w95-btn" onClick={() => openWindow('contact')}>📞 Contact Me</button>
        <button className="w95-btn" onClick={() => window.open('/resume.pdf', '_blank')}>📄 Resume.pdf</button>
      </div>

      {/* Section D - System Properties */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}>System Properties:</div>
        <div className="w95-inset" style={{ padding: '6px 8px', background: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: '#000' }}>
          <div><span style={{ color: '#000080' }}>Frontend  :</span>  React, Next.js, Tailwind, HTML, CSS, JS</div>
          <div><span style={{ color: '#000080' }}>Backend   :</span>  Node.js, Express, REST APIs</div>
          <div><span style={{ color: '#000080' }}>Design    :</span>  Figma, Photoshop, Illustrator</div>
          <div><span style={{ color: '#000080' }}>Tools     :</span>  Git, GitHub, VS Code</div>
        </div>
      </div>
    </div>
  );
}
