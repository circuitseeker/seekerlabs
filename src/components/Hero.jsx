import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.querySelectorAll('.line-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 130);
      });
      setTimeout(() => {
        containerRef.current?.querySelector('.hero-sub')?.classList.add('revealed');
      }, 500);
      setTimeout(() => {
        containerRef.current?.querySelector('.hero-cta')?.classList.add('revealed');
      }, 700);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto">
        <div className="brutal-tag mb-8">Venture Studio</div>
        <h1 className="font-heading text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-bold leading-[1.0] tracking-[-0.04em] text-[#0a0a0a]">
          <span className="line-reveal"><span>We help founders</span></span>
          <br />
          <span className="line-reveal"><span>build, grow, and</span></span>
          <br />
          <span className="line-reveal">
            <span>
              scale{' '}
              <span className="relative inline-block">
                startups
                <span className="absolute bottom-[0.08em] left-0 w-full h-[0.14em] bg-[#DDFC6B] -z-10" />
              </span>
              .
            </span>
          </span>
        </h1>
        <div className="hero-sub reveal mt-10 max-w-[520px]">
          <p className="text-[16px] text-neutral-600 leading-[1.7]">
            A combined alliance of CircuitSeekers, Program Bees &amp; DemonFX Studios.
            Established 2021. We don&rsquo;t just advise &mdash; we co&#8209;build.
          </p>
        </div>
        <div className="hero-cta reveal mt-10">
          <a href="#contact" className="brutal-btn">
            Get in touch
            <span className="text-lg">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
