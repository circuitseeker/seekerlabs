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
                SeekerLabs is a design studio. We partner with founders from day zero
                and stay through scale.
              </p>
            </div>
            <div ref={bodyRef} className="reveal">
              <div className="mt-12 brutal-card p-8 md:p-10">
                <p className="text-[15px] text-neutral-600 leading-[1.8]">
                  A combined alliance of CircuitSeekers and Program Bees, established in 2021.
                  We bring together deep technical capability with growth expertise. Our model
                  is simple: we embed ourselves into your project, share the work, share the risk,
                  and build something that lasts.
                </p>
                <p className="mt-6 text-[15px] text-neutral-600 leading-[1.8]">
                  We&rsquo;ve helped clients go from napkin sketches to launched products,
                  from MVPs to platforms with real traction. Every project we touch gets
                  the full weight of our network, our tools, and our experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
