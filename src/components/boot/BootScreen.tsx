'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

type Stage = 'bios' | 'boot' | 'done';

interface BiosLine {
  id: string;
  text: string;
  color: 'white' | 'grey' | 'green' | 'dim';
}

interface BootScreenProps {
  onComplete: () => void;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState<Stage>('boot');
  const [fading, setFading] = useState(false);
  const [bootVisible, setBootVisible] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  
  const [biosLines, setBiosLines] = useState<BiosLine[]>([]);
  const [ramValue, setRamValue] = useState(0);
  const [ramDone, setRamDone] = useState(false);
  const [asciiBar, setAsciiBar] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  
  const [filledBlocks, setFilledBlocks] = useState(0);
  const [bootMsg, setBootMsg] = useState('Starting Windows 95...');
  const [pct, setPct] = useState(0);

  const skippedRef = useRef(false);
  const stageRef = useRef<Stage>('boot');
  const activeSequence = useRef(true);

  const finish = useCallback(async () => {
    if (stageRef.current === 'done') return;
    stageRef.current = 'done';
    setStage('done');
    setFading(true);
    await wait(460);
    onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(async () => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    
    if (stageRef.current === 'bios') {
      stageRef.current = 'boot';
      setStage('boot');
      setBootVisible(true);
    }
    
    setFilledBlocks(20);
    setPct(100);
    setBootMsg('Loading complete. Welcome, Ithish.');
    
    await wait(300);
    finish();
  }, [finish]);

  useEffect(() => {
    
    const runBootSequence = async () => {
      activeSequence.current = true;

      // Phase 1: Boot Logo
      stageRef.current = 'boot';
      setStage('boot');
      
      await wait(80);
      if (!activeSequence.current || skippedRef.current) return;
      setBootVisible(true);
      
      setTimeout(() => {
        if (activeSequence.current && !skippedRef.current && stageRef.current === 'boot') {
          setSkipVisible(true);
        }
      }, 600);

      for (let i = 0; i < 20; i++) {
        await wait(randomBetween(90, 200));
        if (!activeSequence.current || skippedRef.current) return;
        
        setFilledBlocks(i + 1);
        setPct(Math.round(((i + 1) / 20) * 100));
        
        if (i === 20 - 1) setBootMsg('Loading complete. Welcome, Ithish.');
        else if (i > 16) setBootMsg('Almost ready...');
        else if (i > 13) setBootMsg('Mounting project files...');
        else if (i > 9) setBootMsg('Loading portfolio modules...');
        else if (i > 6) setBootMsg('Initializing IthishOS...');
        else if (i > 3) setBootMsg('Loading system drivers...');
        else setBootMsg('Starting Windows 95...');
      }
      
      if (!activeSequence.current || skippedRef.current) return;
      setSkipVisible(false);
      await wait(700);
      if (!activeSequence.current || skippedRef.current) return;
      
      finish();
    };

    runBootSequence();

    return () => {
      activeSequence.current = false;
    };
  }, [finish, onComplete]);

  if (stage === 'done' && !fading) return null;

  return (
    <div className={`ithish-boot-root ${fading ? 'fading' : ''}`} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', fontFamily: 'var(--font-ui)', transition: fading ? 'opacity 0.45s ease' : 'none' }}>
      
      {/* CRT Scanlines embedded here instead of global CSS just for boot or matching global */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)', zIndex: 10 }}></div>

      {stage === 'bios' && (
        <div style={{ position: 'absolute', inset: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
          {biosLines.map((line, i) => (
            <div key={line.id} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.65, color: line.color === 'white' ? '#FFF' : line.color === 'grey' ? '#AAA' : line.color === 'green' ? '#0B0' : '#888', opacity: 1, animation: 'fadeIn 0.12s ease' }}>
              {line.id === 'ram' ? (
                ramDone ? <span style={{ color: '#0B0' }}>Memory Test: PASS ✓</span> : <span>Memory Test: {ramValue.toLocaleString()} KB</span>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}
          {asciiBar && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.65, color: '#FFF' }}>
              {asciiBar}
              {showCursor && <span style={{ animation: 'blink 0.9s step-end infinite' }}>▌</span>}
            </div>
          )}
        </div>
      )}

      {(stage === 'boot' || stage === 'done') && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: bootVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <div className="w95-flag" style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', width: '58px', height: '58px' }}>
             <div style={{ background: '#E03030', borderRadius: '1px' }}></div>
             <div style={{ background: '#29A836', borderRadius: '1px' }}></div>
             <div style={{ background: '#2B5FC7', borderRadius: '1px' }}></div>
             <div style={{ background: '#E0C020', borderRadius: '1px' }}></div>
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '32px', color: '#FFF', letterSpacing: '1px', marginBottom: '6px', lineHeight: 1 }}>Windows 95</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', color: '#C0C0C0', marginBottom: '28px' }}>IthishOS — Personal Edition</div>
          
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', color: '#C0C0C0', minHeight: '18px', marginBottom: '10px' }}>{bootMsg}</div>
          
          <div style={{ width: '264px', height: '22px', background: '#000', padding: '2px', borderTop: '2px solid #808080', borderLeft: '2px solid #808080', borderRight: '2px solid #FFF', borderBottom: '2px solid #FFF' }}>
            <div style={{ display: 'flex', gap: '2px', height: '100%' }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: '11px', height: '13px', background: i < filledBlocks ? '#000080' : '#000' }}></div>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#808080', letterSpacing: '1px', marginTop: '7px' }}>{pct}%</div>
        </div>
      )}

      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        style={{ 
          position: 'absolute', bottom: '18px', right: '22px', fontFamily: 'var(--font-ui)', fontSize: '14px', 
          color: skipVisible ? '#444' : 'transparent', background: 'none', border: 'none', cursor: skipVisible ? 'pointer' : 'default', 
          transition: 'opacity 0.4s ease, color 0.15s ease', zIndex: 20, outline: 'none'
        }}
        onMouseOver={(e) => skipVisible && (e.currentTarget.style.color = '#888')}
        onMouseOut={(e) => skipVisible && (e.currentTarget.style.color = '#444')}
      >
        Skip →
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );
}
