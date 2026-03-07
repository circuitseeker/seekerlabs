import { useState, useEffect } from 'react';

export default function Splash({ onComplete }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100);
    const t2 = setTimeout(() => setPhase('exit'), 1400);
    const t3 = setTimeout(() => onComplete(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
      style={{
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="text-center"
        style={{
          transform: phase === 'enter' ? 'translateY(30px) scale(0.95)' : 'translateY(0) scale(1)',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <h1 className="font-heading text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-[-0.04em] text-[#F2F0E6]">
          SeekerLabs<span className="text-[#DDFC6B]">.</span>
        </h1>
        <div
          className="mx-auto mt-4 h-[3px] bg-[#DDFC6B]"
          style={{
            width: phase === 'enter' ? '0%' : '100%',
            maxWidth: '120px',
            transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          }}
        />
      </div>
    </div>
  );
}
