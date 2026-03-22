'use client';
import { useState } from 'react';
import BootScreen from '@/components/boot/BootScreen';
import Desktop from '@/components/desktop/Desktop';

export default function Page() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <Desktop />
    </>
  );
}
