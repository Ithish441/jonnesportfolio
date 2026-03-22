import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import './globals.css';

const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt323' });

export const metadata: Metadata = {
  title: 'Ithish Jonnes — Full-Stack Developer & Graphic Designer',
  description: 'I build things & make them look good. Portfolio of Ithish Jonnes.',
  keywords: 'Ithish Jonnes, Full-Stack Developer, Graphic Designer, React, Next.js',
  openGraph: {
    title: 'Ithish Jonnes — IthishOS Portfolio',
    description: 'I build things & make them look good.',
    images: ['/og-preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/computer_explorer-4.png" />
      </head>
      <body className={vt323.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
