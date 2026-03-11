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
                ProgramBee is the software engineering arm of SeekerLabs. We build the
                tech that powers startups from idea to scale.
              </p>
            </div>
            <div ref={bodyRef} className="reveal">
              <div className="mt-12 brutal-card p-8 md:p-10">
                <p className="text-[15px] text-neutral-600 leading-[1.8]">
                  We are a team of engineers, architects, and builders obsessed with shipping great software.
                  From MVPs that validate your idea in weeks, to production platforms serving millions of users &mdash;
                  we handle the entire stack. Web, mobile, cloud, AI, APIs &mdash; everything under one roof.
                </p>
                <p className="mt-6 text-[15px] text-neutral-600 leading-[1.8]">
                  Part of the SeekerLabs alliance alongside CircuitSeekers (hardware) and DemonFX Studios (creative),
                  we bring a full-spectrum approach to product building. You get engineering depth
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
