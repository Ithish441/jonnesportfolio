import React from 'react';

const lines = [
  "Hey, I'm Ithish  ·  I design. I build. I ship.  ·  Let's work together.  ·  ",
  "ITHISH.EXE is running  ·  All systems operational  ·  Ready to ship your next big idea.  ·  ",
  "React · Next.js · Node.js · Figma · Photoshop  ·  Full-Stack · UI/UX · Branding  ·  Hyderabad, IN.  ·  "
];

// We render each character individually so they can be hovered over for the wave effect
const parseText = (text: string) => {
  return text.split('').map((char, index) => (
    <span key={index} className="w95-marquee-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

export default function HeroMarquee() {
  return (
    <div className="w95-hero-marquee-container">
      {lines.map((line, i) => (
        <div 
          key={i} 
          className={`w95-marquee-line ${i % 2 !== 0 ? 'reverse' : ''}`}
          style={{ animationDuration: `${30 + i * 5}s` }}
        >
          {/* We repeat the line 4 times, and translate -50% to create an infinite scroll */}
          {parseText(line + line + line + line)}
        </div>
      ))}
    </div>
  );
}
