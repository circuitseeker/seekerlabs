import { useReveal, useStaggerReveal } from '../hooks/useReveal';

export default function Alliance() {
  const headRef = useReveal();
  const cardsRef = useStaggerReveal(0.08);

  return (
    <section id="alliance" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">The Alliance</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                Three organizations,<br />one mission.
              </p>
            </div>
            <div className="mt-12 grid sm:grid-cols-3 gap-6" ref={cardsRef}>
              <a href="https://circuitseekers.seekerlab.in" target="_blank" rel="noopener noreferrer" className="brutal-card p-8 stagger-child block group">
                <div className="brutal-tag mb-5" style={{ borderColor: '#4FC3F7' }}>Hardware</div>
                <h3 className="text-[18px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em] group-hover:text-neutral-600 transition-colors">
                  Circuit<span style={{ color: '#4FC3F7' }}>Seekers</span>
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.75]">
                  The hardware and electronics arm. Embedded systems, IoT prototyping,
                  PCB design, sensor integration, and manufacturing-ready hardware
                  development. From concept to production.
                </p>
                <span className="inline-block mt-4 text-[12px] font-bold text-neutral-400 uppercase tracking-[0.08em] group-hover:text-[#0a0a0a] transition-colors">
                  Visit site &rarr;
                </span>
              </a>
              <a href="https://programbee.seekerlab.in" target="_blank" rel="noopener noreferrer" className="brutal-card-accent p-8 stagger-child block group">
                <div className="brutal-tag mb-5">Software</div>
                <h3 className="text-[18px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em] group-hover:text-neutral-700 transition-colors">
                  Program<span style={{ color: '#FFB74D' }}>Bee</span>
                </h3>
                <p className="text-[13px] text-neutral-700 leading-[1.75]">
                  The software and tech arm. Full-stack web and mobile development,
                  cloud infrastructure, APIs, AI/ML model building, and scalable
                  platforms. Production-grade engineering at startup speed.
                </p>
                <span className="inline-block mt-4 text-[12px] font-bold text-neutral-700 uppercase tracking-[0.08em] group-hover:text-[#0a0a0a] transition-colors">
                  Visit site &rarr;
                </span>
              </a>
              <a href="https://dreamonstudios.seekerlab.in" target="_blank" rel="noopener noreferrer" className="brutal-card p-8 stagger-child block group">
                <div className="brutal-tag mb-5" style={{ borderColor: '#EF5350' }}>Creative &amp; VFX</div>
                <h3 className="text-[18px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em] group-hover:text-neutral-600 transition-colors">
                  Dreamon<span style={{ color: '#EF5350' }}>FX</span> Studios
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.75]">
                  The creative and post-production arm. Video editing, color grading,
                  After Effects compositing, motion graphics, VFX, sound design,
                  and cinematic content that tells your story.
                </p>
                <span className="inline-block mt-4 text-[12px] font-bold text-neutral-400 uppercase tracking-[0.08em] group-hover:text-[#0a0a0a] transition-colors">
                  Visit site &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
