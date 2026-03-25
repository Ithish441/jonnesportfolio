'use client';
import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { title: "Lukas Graham - 7 Years", url: "/music/Lukas Graham - 7 Years.mp3" },
  { title: "Eminem - Mockingbird", url: "/music/Eminem - Mockingbird.mp3" }
];

export default function MusicWindow() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio node
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', handleNext);
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = TRACKS[currentTrackIndex].url;
      // If we swap tracks while playing, auto-play the new one immediately
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Playback prevented', e));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    }
  };

  return (
    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
      
      {/* LCD Visualizer Screen */}
      <div className="w95-sunken" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--win-black)', padding: '12px' }}>
        <img src="/icons/music.svg" alt="Music" style={{ width: '48px', height: '48px' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#00FF00', marginBottom: '4px' }}>
            {isPlaying ? '▶ PLAYING' : '■ STOPPED'}
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {TRACKS[currentTrackIndex].title}
          </div>
        </div>
      </div>

      {/* Progress Slider */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <input 
          type="range" 
          min="0" max="100" 
          value={isNaN(progress) ? 0 : progress} 
          onChange={handleSeek}
          style={{ width: '100%', cursor: 'pointer', margin: 0 }}
        />
      </div>

      {/* Media Controls */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', paddingBottom: '6px' }}>
        <button className="w95-btn" style={{ minWidth: '40px', padding: '4px 8px' }} onClick={handlePrev}>⏮</button>
        <button className="w95-btn" style={{ minWidth: '40px', padding: '4px 8px' }} onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="w95-btn" style={{ minWidth: '40px', padding: '4px 8px' }} onClick={handleNext}>⏭</button>
      </div>

      {/* Playlist Listbox */}
      <div className="w95-sunken" style={{ flex: 1, background: 'var(--win-light)', overflowY: 'auto' }}>
        {TRACKS.map((track, idx) => (
          <div 
            key={idx} 
            onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
            style={{ 
              padding: '4px 8px', 
              fontFamily: 'var(--font-ui)', 
              fontSize: '15px', 
              cursor: 'pointer',
              background: idx === currentTrackIndex ? 'var(--title-active-1)' : 'transparent',
              color: idx === currentTrackIndex ? 'var(--win-light)' : '#000'
            }}
          >
            {String(idx + 1).padStart(2, '0')}. {track.title}
          </div>
        ))}
      </div>

    </div>
  );
}
