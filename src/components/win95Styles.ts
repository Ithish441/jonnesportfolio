export const WIN95_CSS = `
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

:root {
  --desktop-bg: #008080;
  --win-grey: #C0C0C0;
  --win-light: #FFFFFF;
  --win-dark: #808080;
  --win-deep: #404040;
  --win-black: #000000;
  
  --title-active-1: #000080;
  --title-active-2: #1084D0;
  --title-inactive: #808080;
  --title-text: #FFFFFF;
  
  --font-ui: 'VT323', 'MS Sans Serif', Tahoma, sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
  
  --term-grey: #C0C0C0;
  --muted-text: #444444;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: none;
  font-smooth: never;
}

body {
  font-family: var(--font-ui);
  background: var(--desktop-bg);
  overflow: hidden;
}

img, svg {
  display: block;
}

.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
}

/* Win95 3D Borders */
.w95-raised {
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
}

.w95-sunken {
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}

.w95-btn {
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  padding: 3px 16px;
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--win-black);
  cursor: default;
  min-width: 88px;
  outline: none;
}
.w95-btn:active {
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}

/* Base OS */
.w95-desktop {
  position: fixed;
  inset: 0;
  background-color: var(--desktop-bg);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  background-blend-mode: overlay;
  background-size: 200px 200px;
}

.w95-desktop::after {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.04) 3px,
    rgba(0, 0, 0, 0.04) 4px
  );
  pointer-events: none;
  z-index: 9997;
}

.w95-canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 28px;
}

/* Desktop Icons */
.w95-dicon {
  width: 70px;
  padding: 4px 2px;
  cursor: default;
}
.w95-dicon-img-wrap {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.w95-dicon img {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}
.w95-dicon span {
  display: block;
  color: var(--win-light);
  font-family: var(--font-ui);
  font-size: 13px;
  text-align: center;
  margin-top: 2px;
  text-shadow: 1px 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;
  word-break: break-word;
  max-width: 68px;
  line-height: 1.2;
}

.w95-dicon:hover .w95-dicon-img-wrap, .w95-dicon.sel .w95-dicon-img-wrap {
  background: rgba(0, 0, 128, 0.45);
}

/* Window Framework */
.w95-win {
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-deep);
  border-bottom: 2px solid var(--win-deep);
  box-shadow: 2px 2px 0 var(--win-black);
  background: var(--win-grey);
  display: flex;
  flex-direction: column;
}

@keyframes windowOpen {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.w95-win.opening {
  animation: windowOpen 0.15s ease forwards;
}

.w95-titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22px;
  padding: 2px 3px 2px 4px;
}
.w95-titlebar.active {
  background: linear-gradient(90deg, var(--title-active-1), var(--title-active-2));
}
.w95-titlebar.inactive {
  background: var(--title-inactive);
}
.w95-titlebar-left {
  display: flex;
  align-items: center;
  min-width: 0;
}
.w95-tbar-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
  margin-right: 4px;
}
.w95-tbar-title {
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--title-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}

.w95-win-btns {
  display: flex;
  gap: 2px;
}
.w95-wb {
  width: 16px;
  height: 14px;
  background: var(--win-grey);
  border-top: 1px solid var(--win-light);
  border-left: 1px solid var(--win-light);
  border-right: 1px solid var(--win-deep);
  border-bottom: 1px solid var(--win-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-ui);
  color: var(--win-black);
  font-size: 10px;
  outline: none;
  cursor: default;
}
.w95-wb:active {
  border-top: 1px solid var(--win-deep);
  border-left: 1px solid var(--win-deep);
  border-right: 1px solid var(--win-light);
  border-bottom: 1px solid var(--win-light);
}

.w95-menubar {
  height: 20px;
  background: var(--win-grey);
  border-bottom: 1px solid var(--win-dark);
  display: flex;
  padding: 0 2px;
}
.w95-mitem {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--win-black);
  padding: 0 6px;
  line-height: 20px;
  cursor: default;
}
.w95-mitem:hover {
  background: var(--title-active-1);
  color: var(--win-light);
}

.w95-content {
  flex: 1;
  min-height: 0;
  background: var(--win-grey);
  overflow: auto;
}

.w95-content::-webkit-scrollbar { width: 17px; }
.w95-content::-webkit-scrollbar-track { background: var(--win-grey); }
.w95-content::-webkit-scrollbar-thumb {
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
}
.w95-content::-webkit-scrollbar-button {
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  height: 17px;
}

.w95-statusbar {
  height: 20px;
  border-top: 1px solid var(--win-dark);
  padding: 0 4px;
  display: flex;
  align-items: center;
}
.w95-status-text {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--win-black);
}

/* Insets */
.w95-inset {
  background: var(--win-light);
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}
.w95-inset-dark {
  background: var(--win-grey);
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}

/* Taskbar */
.w95-taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  display: flex;
  align-items: center;
  padding: 0 2px;
  gap: 2px;
  z-index: 9996;
}

.w95-start-btn {
  height: 22px;
  padding: 0 8px;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: bold;
  outline: none;
}
.w95-start-btn.pressed {
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}

.w95-flag {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  width: 16px;
  height: 16px;
}
.w95-flag > div:nth-child(1) { background: #E03030; }
.w95-flag > div:nth-child(2) { background: #29A836; }
.w95-flag > div:nth-child(3) { background: #2B5FC7; }
.w95-flag > div:nth-child(4) { background: #E0C020; }

.w95-taskbar-sep {
  width: 1px;
  height: 20px;
  background: var(--win-dark);
  border-right: 1px solid var(--win-light);
  margin: 0 2px;
}

.w95-taskbar-btns {
  flex: 1;
  display: flex;
  gap: 2px;
  overflow: hidden;
}

.w95-tb-btn {
  height: 22px;
  min-width: 80px;
  max-width: 150px;
  padding: 0 6px;
  font-family: var(--font-ui);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  outline: none;
}
.w95-tb-btn.focused {
  background: #D4D0C8;
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}

.w95-tray {
  margin-left: auto;
  height: 22px;
  padding: 0 8px;
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
  display: flex;
  align-items: center;
  gap: 6px;
}
.w95-tray span {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--win-black);
}

/* Start Menu */
.w95-start-menu {
  position: fixed;
  bottom: 28px;
  left: 0;
  width: 210px;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-deep);
  border-bottom: 2px solid var(--win-deep);
  box-shadow: 2px 2px 0 var(--win-black);
  z-index: 9998;
  display: flex;
}

.w95-sm-banner {
  width: 24px;
  background: linear-gradient(to top, var(--title-active-1), var(--title-active-2));
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
}
.w95-sm-banner span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-ui);
  font-size: 18px;
  color: var(--win-light);
  letter-spacing: 3px;
}

.w95-sm-items {
  flex: 1;
  padding: 2px 0;
  display: flex;
  flex-direction: column;
}
.w95-sm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--win-black);
  text-decoration: none;
  cursor: default;
}
.w95-sm-item:hover {
  background: var(--title-active-1);
  color: var(--win-light);
}
.w95-sm-item img {
  width: 20px;
  height: 20px;
  image-rendering: pixelated;
}

.w95-sm-div {
  height: 1px;
  background: var(--win-dark);
  border-bottom: 1px solid var(--win-light);
  margin: 3px 0;
}

/* Context Menu */
.w95-ctx {
  position: fixed;
  min-width: 180px;
  padding: 2px 0;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  box-shadow: 2px 2px 0 var(--win-black);
  z-index: 9999;
}
.w95-ctx-item {
  padding: 4px 20px;
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--win-black);
  cursor: default;
}
.w95-ctx-item:hover {
  background: var(--title-active-1);
  color: var(--win-light);
}
.w95-ctx-div {
  height: 1px;
  background: var(--win-dark);
  border-bottom: 1px solid var(--win-light);
  margin: 2px 4px;
}

/* Dividers */
.w95-divider {
  height: 2px;
  background: var(--win-dark);
  border-bottom: 1px solid var(--win-light);
  margin: 8px 0;
}

/* Project Toolbar */
.w95-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px 4px;
  border-bottom: 2px solid var(--win-dark);
}

.w95-addr {
  flex: 1;
  background: var(--win-light);
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
  padding: 1px 6px;
  font-family: var(--font-ui);
  font-size: 13px;
}

/* Projects Views */
.w95-proj-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.w95-proj-icon {
  width: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 4px;
}
.w95-proj-icon:hover {
  background: rgba(0, 0, 128, 0.1);
  border: 1px dotted var(--title-active-1);
  padding: 5px 3px;
}
.w95-proj-icon.sel {
  background: rgba(0, 0, 128, 0.15);
  border: 1px dotted var(--title-active-1);
  padding: 5px 3px;
}
.w95-list-table {
  width: 100%;
  border-collapse: collapse;
}
.w95-list-table th {
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  font-family: var(--font-ui);
  font-size: 13px;
  text-align: left;
  padding: 2px 4px;
  font-weight: normal;
}
.w95-list-row {
  height: 20px;
}
.w95-list-row:nth-child(even) { background: rgba(0, 0, 0, 0.03); }
.w95-list-row:hover, .w95-list-row.sel {
  background: var(--title-active-1);
  color: var(--win-light);
}
.w95-list-row td {
  font-family: var(--font-ui);
  font-size: 13px;
  padding: 2px 8px;
}
.w95-status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

/* Terminal */
.w95-term-wrap {
  background: var(--win-black);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
}
.w95-term-out {
  flex: 1;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  word-break: break-all;
}
.w95-term-out::-webkit-scrollbar { width: 8px; }
.w95-term-out::-webkit-scrollbar-track { background: var(--win-black); }
.w95-term-out::-webkit-scrollbar-thumb { background: #444; }

.w95-term-prompt {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--term-grey);
  white-space: nowrap;
}
.w95-term-input-row {
  display: flex;
  margin-top: 4px;
}
.w95-term-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--win-light);
  caret-color: var(--win-light);
}

/* Contact */
.w95-contact-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 8px;
  background: var(--win-grey);
  border-top: 2px solid var(--win-light);
  border-left: 2px solid var(--win-light);
  border-right: 2px solid var(--win-dark);
  border-bottom: 2px solid var(--win-dark);
  color: var(--win-black);
  text-decoration: none;
}
.w95-contact-btn:hover {
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
}
.cb-label {
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: bold;
}
.cb-sub {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--muted-text);
}
.w95-email-row {
  background: var(--win-light);
  border-top: 2px solid var(--win-dark);
  border-left: 2px solid var(--win-dark);
  border-right: 2px solid var(--win-light);
  border-bottom: 2px solid var(--win-light);
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.w95-email-row:hover { background: #E0E0FF; }
`;
