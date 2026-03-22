'use client';
import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

export interface WindowDef {
  id: string;
  title: string;
  icon: string;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
}

export interface WindowState extends WindowDef {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export type WMAction = 
  | { type: 'OPEN'; id: string }
  | { type: 'CLOSE'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'MAXIMIZE'; id: string }
  | { type: 'FOCUS'; id: string };

export interface WMState {
  windows: WindowState[];
  topZ: number;
}

export interface WMContextType extends WMState {
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  getWindow: (id: string) => WindowState | undefined;
}

const WINDOW_DEFS: WindowDef[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: '/icons/about.svg',
    defaultPos: { x: 80, y: 50 },
    defaultSize: { w: 480, h: 430 }
  },
  {
    id: 'projects',
    title: 'My Projects',
    icon: '/icons/projects.svg',
    defaultPos: { x: 130, y: 70 },
    defaultSize: { w: 580, h: 460 }
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '/icons/contact.svg',
    defaultPos: { x: 250, y: 90 },
    defaultSize: { w: 440, h: 360 }
  },
  {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: '/icons/recycle.svg',
    defaultPos: { x: 300, y: 130 },
    defaultSize: { w: 380, h: 180 }
  },
  {
    id: 'music',
    title: 'Music Player',
    icon: '/icons/music.svg',
    defaultPos: { x: 200, y: 180 },
    defaultSize: { w: 320, h: 240 }
  },
  {
    id: 'myapps',
    title: 'My Apps',
    icon: '/icons/myapps.svg',
    defaultPos: { x: 240, y: 150 },
    defaultSize: { w: 400, h: 300 }
  }
];

const initialState: WMState = {
  windows: WINDOW_DEFS.map(def => ({
    ...def,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0
  })),
  topZ: 10
};

function reducer(state: WMState, action: WMAction): WMState {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map(w => 
          w.id === action.id 
            ? { ...w, isOpen: true, isMinimized: false, zIndex: state.topZ + 1 }
            : w
        )
      };
    case 'CLOSE':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.id 
            ? { ...w, isOpen: false, isMinimized: false, isMaximized: false }
            : w
        )
      };
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.id ? { ...w, isMinimized: !w.isMinimized } : w
        )
      };
    case 'MAXIMIZE':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.id ? { ...w, isMaximized: !w.isMaximized } : w
        )
      };
    case 'FOCUS':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map(w => 
          w.id === action.id ? { ...w, zIndex: state.topZ + 1 } : w
        )
      };
    default:
      return state;
  }
}

const WMContext = createContext<WMContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openWindow = useCallback((id: string) => dispatch({ type: 'OPEN', id }), []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE', id }), []);
  const maximizeWindow = useCallback((id: string) => dispatch({ type: 'MAXIMIZE', id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', id }), []);
  
  const getWindow = useCallback((id: string) => {
    return state.windows.find(w => w.id === id);
  }, [state.windows]);

  return (
    <WMContext.Provider value={{
      ...state,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      getWindow
    }}>
      {children}
    </WMContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WMContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
