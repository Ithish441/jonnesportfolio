'use client';
import React, { useState } from 'react';

export default function ContactWindow() {
  const [copied, setCopied] = useState(false);
  const email = 'ithish441@gmail.com'; // Placeholder, user mentioned handles but not specific email yet, using a likely one or keeping placeholder

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', color: '#000', margin: 0, lineHeight: 1.4 }}>
        Have a project in mind, or just want to say hi? 
        Shoot me an email or find me on social media.
      </p>

      <div className="w95-email-row" onClick={handleCopy}>
        <img src="/icons/mail_generic-4.png" alt="Email" style={{ width: '24px', height: '24px', imageRendering: 'pixelated' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Email Address</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#000080' }}>{email}</div>
        </div>
        <button className="w95-btn" style={{ minWidth: '60px', padding: '2px 6px' }}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <a href="https://github.com/Ithish441" target="_blank" rel="noreferrer" className="w95-contact-btn">
          <img src="/icons/network_internet_globe-4.png" alt="GitHub" style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} />
          <span className="cb-label">GitHub</span>
          <span className="cb-sub">@Ithish441</span>
        </a>
        
        <a href="https://www.instagram.com/ithish_jonnes_/" target="_blank" rel="noreferrer" className="w95-contact-btn">
          <img src="/icons/network_internet_globe-4.png" alt="Instagram" style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} />
          <span className="cb-label">Instagram</span>
          <span className="cb-sub">@ithish_jonnes_</span>
        </a>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '12px', textAlign: 'center' }}>
        <button className="w95-btn" style={{ width: '100%', maxWidth: '200px' }} onClick={() => window.open('https://wa.me/91720766728', '_blank')}>
          Message on WhatsApp
        </button>
      </div>
    </div>
  );
}
