'use client';
import React from 'react';
import { useWindowManager } from '@/context/WindowManager';

export default function RecycleBinWindow() {
  const { closeWindow } = useWindowManager();

  return (
    <div style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <img src="/icons/msg_warning-4.png" alt="Warning" style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', color: '#000', margin: '0 0 16px', lineHeight: 1.4 }}>
          It looks like there&apos;s no trash here! My code is too clean to throw away.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="w95-btn" onClick={() => closeWindow('recycle')}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
