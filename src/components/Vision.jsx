import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const pillars = [
  {
    title: 'Democratize entrepreneurship',
    text: "The best ideas don't always come from the best-funded people. We provide world-class resources and access to anyone with a vision worth building.",
  },
  {
    title: 'Build for the long game',
    text: "We don't chase trends. Every startup we touch is designed to outlast market cycles and compound value over decades.",
  },
  {
    title: 'Create ecosystem effects',
    text: 'Our portfolio companies share talent, technology, and distribution. Each new venture makes the others stronger.',
  },
];

export default function Vision() {
  const headRef = useReveal();
  const listRef = useStaggerReveal(0.08);

  return (
    <section id="vision" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">Vision</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#1A4D3E]">
                We believe the best companies are built by people who care deeply
                about the problem, not just the opportunity.
              </p>
            </div>
            <div className="mt-12 space-y-5" ref={listRef}>
              {pillars.map((item, i) => (
                <div
                  key={item.title}
                  className={`stagger-child p-7 border-l-[5px] border-[#1A4D3E] ${
                    i === 0 ? 'bg-[#C8943E]' : 'bg-white'
                  } border-y-[2.5px] border-r-[2.5px]`}
                >
                  <h3 className="text-[15px] font-heading font-bold text-[#1A4D3E] mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className={`text-[13px] leading-[1.75] ${i === 0 ? 'text-[#1A4D3E]/80' : 'text-[#1A4D3E]/60'}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
