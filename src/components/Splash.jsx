import { useState, useEffect } from 'react';

export default function Splash({ onComplete }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 150);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const isExit = phase === 'exit';
  const isEnter = phase === 'enter';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backdropFilter: isExit ? 'blur(0px)' : 'blur(24px)',
        WebkitBackdropFilter: isExit ? 'blur(0px)' : 'blur(24px)',
        backgroundColor: isExit ? 'rgba(242,240,230,0)' : 'rgba(242,240,230,0.7)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isExit ? 'none' : 'auto',
      }}
    >
      {/* Subtle radial glow behind text */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(221,252,107,0.25) 0%, transparent 70%)',
          opacity: isEnter || isExit ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      />

      <div
        className="text-center relative"
        style={{
          transform: isEnter ? 'translateY(40px) scale(0.92)' : isExit ? 'translateY(-40px) scale(0.95)' : 'translateY(0) scale(1)',
          opacity: isEnter ? 0 : isExit ? 0 : 1,
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <h1 className="font-heading text-[52px] sm:text-[72px] md:text-[90px] font-bold tracking-[-0.05em] text-[#0a0a0a]">
          SeekerLabs<span className="text-[#DDFC6B]">.</span>
        </h1>
        <div
          className="mx-auto mt-5 h-[3px] bg-[#DDFC6B]"
          style={{
            width: isEnter ? '0%' : '100%',
            maxWidth: '140px',
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          }}
        />
        <p
          className="mt-5 text-[13px] font-medium tracking-[0.2em] uppercase text-neutral-400"
          style={{
            opacity: isEnter ? 0 : isExit ? 0 : 1,
            transform: isEnter ? 'translateY(10px)' : 'translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
          }}
        >
          Venture Studio
        </p>
      </div>
    </div>
  );
}
