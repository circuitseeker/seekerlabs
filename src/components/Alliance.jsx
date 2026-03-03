export default function Alliance() {
  return (
    <section id="alliance" className="py-28 px-6 border-t border-neutral-200">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em]">
              The Alliance
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-[28px] md:text-[36px] font-heading font-semibold leading-[1.3] tracking-[-0.01em] text-black">
              Two organizations, one mission.
            </p>
            <div className="mt-12 grid sm:grid-cols-2 gap-16">
              <div>
                <h3 className="text-[15px] font-semibold text-black mb-3">
                  CircuitSeekers
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.7]">
                  The engineering and product arm. Hardware prototyping, full-stack
                  software development, AI/ML model building, and scalable cloud
                  infrastructure. From embedded systems to production-grade platforms.
                </p>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-black mb-3">
                  Program Bees
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.7]">
                  The creator and growth arm. Multi-platform content strategy,
                  creator management, brand partnerships, audience development,
                  and monetization systems that turn attention into revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
