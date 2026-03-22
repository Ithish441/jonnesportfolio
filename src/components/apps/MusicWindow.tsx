'use client';
import React from 'react';

export default function MusicWindow() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
      <img src="/icons/music.svg" alt="Music" style={{ width: '64px', height: '64px', marginBottom: '16px' }} />
      <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', color: '#000', margin: '0 0 8px 0' }}>Music Player</h2>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#444', textAlign: 'center', maxWidth: '250px' }}>
        No tracks loaded. Playback module under construction.
      </p>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
        <button className="w95-btn">⏮</button>
        <button className="w95-btn">▶</button>
        <button className="w95-btn">⏭</button>
      </div>
    </div>
  );
}
