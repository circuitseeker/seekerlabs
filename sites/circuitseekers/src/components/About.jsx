import { useReveal } from '../hooks/useReveal';

export default function About() {
  const headRef = useReveal();
  const bodyRef = useReveal(0.1);

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">About</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                CircuitSeekers is the hardware engineering arm of SeekerLabs. We build the
                physical tech that powers products from concept to manufacturing.
              </p>
            </div>
            <div ref={bodyRef} className="reveal">
              <div className="mt-12 brutal-card p-8 md:p-10">
                <p className="text-[15px] text-neutral-600 leading-[1.8]">
                  We are a team of hardware engineers, firmware developers, and IoT architects obsessed with building reliable devices.
                  From sensor prototypes that validate your concept in days, to production-ready PCBs serving thousands of units &mdash;
                  we handle the entire hardware stack.
                </p>
                <p className="mt-6 text-[15px] text-neutral-600 leading-[1.8]">
                  Part of the SeekerLabs alliance alongside ProgramBee (software) and DreamonFX Studios (creative),
                  we bring a full-spectrum approach to product building. You get hardware depth
                  with cross-functional breadth &mdash; all without the overhead of managing multiple vendors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
