import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.querySelectorAll('.line-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 140);
      });
      setTimeout(() => {
        containerRef.current?.querySelector('.hero-sub')?.classList.add('revealed');
      }, 550);
      setTimeout(() => {
        containerRef.current?.querySelector('.hero-cta')?.classList.add('revealed');
      }, 750);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 lg:px-8 overflow-hidden" ref={containerRef}>
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="brutal-tag mb-8">Software & Tech Studio</div>
        <h1 className="font-heading text-[42px] sm:text-[58px] md:text-[76px] lg:text-[90px] font-bold leading-[0.98] tracking-[-0.045em] text-[#0a0a0a]">
          <span className="line-reveal"><span>We engineer</span></span>
          <br />
          <span className="line-reveal"><span>software that</span></span>
          <br />
          <span className="line-reveal">
            <span>
              <span className="relative inline-block">
                ships
                <span className="absolute bottom-[0.08em] left-0 w-full h-[0.15em] bg-[#FFB74D] -z-10" />
              </span>
              .
            </span>
          </span>
        </h1>
        <div className="hero-sub reveal mt-10 max-w-[520px]">
          <p className="text-[16px] md:text-[17px] text-neutral-600 leading-[1.75]">
            The software &amp; tech arm of SeekerLabs.
            Full-stack development, cloud infrastructure, AI/ML, and scalable platforms.
            Production-grade engineering at startup speed.
          </p>
        </div>
        <div className="hero-cta reveal mt-10">
          <a href="#contact" className="brutal-btn">
            <span>Start your project</span>
            <span className="text-lg">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
