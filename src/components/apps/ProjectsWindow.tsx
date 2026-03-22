'use client';
import React, { useState } from 'react';
import { projects, Project } from '@/data/projects';

export default function ProjectsWindow() {
  const [view, setView] = useState<'icons' | 'list'>('icons');
  const [selected, setSelected] = useState<Project | null>(null);

  const handleDoubleClick = (project: Project) => {
    setSelected(project);
  };

  const handleSelect = (project: Project) => {
    setSelected(prev => (prev?.id === project.id ? null : project));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div className="w95-toolbar">
        <button 
          className={view === 'icons' ? 'w95-sunken' : 'w95-raised'} 
          style={{ width: '28px', height: '22px', background: '#C0C0C0', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
          onClick={() => setView('icons')}
        >
          ⊞
        </button>
        <button 
          className={view === 'list' ? 'w95-sunken' : 'w95-raised'} 
          style={{ width: '28px', height: '22px', background: '#C0C0C0', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
          onClick={() => setView('list')}
        >
          ≡
        </button>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', marginLeft: '4px', color: '#000' }}>Address:</span>
        <div className="w95-addr">
          C:\ITHISH\Projects\
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {view === 'icons' ? (
          <div className="w95-proj-grid" style={{ padding: '8px', overflow: 'auto', flex: 1, alignContent: 'flex-start' }}>
            {projects.map((p) => (
              <div 
                key={p.id} 
                className={`w95-proj-icon ${selected?.id === p.id ? 'sel' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleSelect(p); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(p); }}
              >
                <img 
                  src="/icons/directory_open_file_mydocs-4.png" 
                  alt={p.name} 
                  style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} 
                  onError={(e) => { (e.target as HTMLImageElement).src = '/icons/directory_closed-4.png'; }}
                />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: selected?.id === p.id ? '#FFF' : '#000', textAlign: 'center', marginTop: '4px' }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w95-inset-dark" style={{ flex: 1, overflow: 'auto' }}>
            <table className="w95-list-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Name</th>
                  <th style={{ width: '28%' }}>Type</th>
                  <th style={{ width: '12%' }}>Year</th>
                  <th style={{ width: '20%' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr 
                    key={p.id} 
                    className={`w95-list-row ${selected?.id === p.id ? 'sel' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleSelect(p); }}
                    onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(p); }}
                    style={{ cursor: 'default' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src="/icons/directory_closed-4.png" alt="" style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }} />
                        {p.name}
                      </div>
                    </td>
                    <td>{p.type}</td>
                    <td>{p.year}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="w95-status-dot" style={{ 
                          background: p.status === 'Live' ? '#008000' : p.status === 'In Progress' ? '#CC8800' : '#888888',
                          width: '8px', height: '8px', borderRadius: '50%', marginRight: '6px'
                        }}></span>
                        {p.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Project Detail Panel */}
        {selected && (
          <div style={{ 
            height: '180px', 
            borderTop: '2px solid var(--win-deep)', 
            background: 'var(--win-grey)', 
            padding: '8px', 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button 
              className="w95-wb" 
              style={{ position: 'absolute', top: '6px', right: '6px', fontWeight: 'bold' }}
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{selected.name}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#444' }}>
              {selected.type} — {selected.year} — <span style={{ color: selected.status === 'Live' ? '#008000' : selected.status === 'In Progress' ? '#CC8800' : '#888888' }}>● {selected.status}</span>
            </div>
            <div className="w95-inset" style={{ padding: '6px 8px', background: '#FFF', fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#000', flex: 1, overflowY: 'auto' }}>
              {selected.description}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selected.tags.map(tag => (
                <div key={tag} className="w95-sunken" style={{ padding: '1px 8px', fontFamily: 'var(--font-ui)', fontSize: '12px', background: '#D4D0C8', color: '#000' }}>
                  {tag}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <a href={selected.liveUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="w95-btn" style={{ fontSize: '14px' }}>🌐 Live Demo</button>
              </a>
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="w95-btn" style={{ fontSize: '14px' }}>&lt;/&gt; Source Code</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
