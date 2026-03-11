import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const pillars = [
  {
    title: 'Prototype early, test rigorously',
    text: "We don't design in simulation forever. Every sprint produces a working prototype. You touch real hardware, test real sensors, and iterate with actual data.",
  },
  {
    title: 'Design for manufacturing from day one',
    text: "Even prototypes get clean schematics. We design PCBs that your manufacturer will love — proper footprints, test points, and production-ready files.",
  },
  {
    title: 'Your hardware partner, not just a vendor',
    text: "We embed ourselves into your team. We care about your BOM cost, your reliability targets, and your timeline. Your product success is our success.",
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
                We don&rsquo;t just design circuits. We build devices
                that people actually use.
              </p>
            </div>
            <div className="mt-12 space-y-5" ref={listRef}>
              {pillars.map((item, i) => (
                <div
                  key={item.title}
                  className={`stagger-child p-7 border-l-[5px] border-[#0a0a0a] ${
                    i === 0 ? 'bg-[#4FC3F7]' : 'bg-white'
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
