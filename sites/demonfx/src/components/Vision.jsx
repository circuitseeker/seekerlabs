import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const pillars = [
  {
    title: 'Story first, always',
    text: "Every cut, every grade, every effect serves the narrative. We don't add flash for the sake of it. We ask: does this make the viewer feel something?",
  },
  {
    title: 'Cinematic quality, any budget',
    text: "Whether it's a startup promo or a feature film, we bring the same craft and attention to detail. Great storytelling isn't about budget — it's about skill.",
  },
  {
    title: 'Your creative partner, not just an editor',
    text: "We embed ourselves into your vision. We understand your brand, your audience, and your goals. Your story becomes our obsession.",
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
                We don&rsquo;t just edit footage. We craft experiences
                that people remember.
              </p>
            </div>
            <div className="mt-12 space-y-5" ref={listRef}>
              {pillars.map((item, i) => (
                <div
                  key={item.title}
                  className={`stagger-child p-7 border-l-[5px] border-[#0a0a0a] ${
                    i === 0 ? 'bg-[#EF5350]' : 'bg-white'
                  } border-y-[2.5px] border-r-[2.5px]`}
                >
                  <h2 className="text-[15px] font-heading font-bold text-[#0a0a0a] mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h2>
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
