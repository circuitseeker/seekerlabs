import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const pillars = [
  {
    title: 'Ship early, learn fast',
    text: "We don't build in the dark. Every sprint ships something real. You see progress, users give feedback, and the product evolves with signal, not guesswork.",
  },
  {
    title: 'Engineer for scale from day one',
    text: "Even MVPs get clean architecture. We write code that your future team will thank us for — modular, tested, documented, and ready to grow.",
  },
  {
    title: 'Your tech partner, not just a vendor',
    text: "We embed ourselves into your team. We care about your metrics, your users, and your runway. Your success is literally our success.",
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
            <div className="brutal-tag">How We Work</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                We don&rsquo;t just write code. We build products
                that people actually use.
              </p>
            </div>
            <div className="mt-12 space-y-5" ref={listRef}>
              {pillars.map((item, i) => (
                <div
                  key={item.title}
                  className={`stagger-child p-7 border-l-[5px] border-[#0a0a0a] ${
                    i === 0 ? 'bg-[#FFB74D]' : 'bg-white'
                  } border-y-[2.5px] border-r-[2.5px]`}
                >
                  <h3 className="text-[15px] font-heading font-bold text-[#0a0a0a] mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 leading-[1.75]">
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
