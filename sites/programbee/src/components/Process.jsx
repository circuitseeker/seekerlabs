import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'We understand your idea, market, users, and goals. No fluff, just sharp clarity on what needs to be built and why.',
  },
  {
    num: '02',
    title: 'Architecture',
    description: 'We design the system before writing a line of code. Tech stack selection, database design, API contracts, infrastructure planning.',
  },
  {
    num: '03',
    title: 'Sprint & Ship',
    description: 'Two-week sprints with deployable output every cycle. You see real progress, real demos, and can course-correct in real time.',
  },
  {
    num: '04',
    title: 'Launch & Scale',
    description: 'Production deployment, monitoring, performance optimization, and ongoing support. We stay until the product flies on its own.',
  },
];

export default function Process() {
  const headRef = useReveal();
  const listRef = useStaggerReveal(0.08);

  return (
    <section id="process" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">Process</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                From idea to production<br />in four steps.
              </p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-6" ref={listRef}>
              {steps.map((step) => (
                <div key={step.num} className="brutal-card p-7 stagger-child">
                  <span className="font-heading text-[12px] font-bold text-[#0a0a0a] inline-block mb-4 tracking-wider border-b-[3px] border-[#FFB74D] pb-1">
                    {step.num}
                  </span>
                  <h3 className="text-[16px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-[1.75]">
                    {step.description}
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
