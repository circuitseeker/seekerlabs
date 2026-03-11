import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show on desktop with fine pointer
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Smooth ring follow
    let raf;
    const followRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf = requestAnimationFrame(followRing);
    };
    raf = requestAnimationFrame(followRing);

    // Hover detection for interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .brutal-btn, .brutal-card, .brutal-card-accent');
      if (target) {
        dotRef.current?.classList.add('hovering');
        ringRef.current?.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, .brutal-btn, .brutal-card, .brutal-card-accent');
      if (target) {
        dotRef.current?.classList.remove('hovering');
        ringRef.current?.classList.remove('hovering');
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [visible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
