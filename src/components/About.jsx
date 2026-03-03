export default function About() {
  return (
    <section id="about" className="py-28 px-6 border-t border-neutral-200">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em]">
              About
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-[28px] md:text-[36px] font-heading font-semibold leading-[1.3] tracking-[-0.01em] text-black">
              SeekerLabs is a venture studio. We partner with founders from day zero
              and stay through scale. We don't just advise &mdash; we co-build.
            </p>
            <p className="mt-8 text-[15px] text-neutral-500 leading-[1.75]">
              A combined alliance of CircuitSeekers and Program Bees, established in 2021.
              We bring together deep technical capability with growth expertise. Our model
              is simple: we embed ourselves into your startup, share the work, share the risk,
              and build something that lasts.
            </p>
            <p className="mt-5 text-[15px] text-neutral-500 leading-[1.75]">
              We've helped founders go from napkin sketches to funded startups,
              from MVPs to products with real traction. Every startup we touch gets
              the full weight of our network, our tools, and our experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
