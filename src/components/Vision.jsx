const pillars = [
  {
    title: 'Democratize entrepreneurship',
    text: 'The best ideas don\'t always come from the best-funded people. We provide world-class resources and access to anyone with a vision worth building.',
  },
  {
    title: 'Build for the long game',
    text: 'We don\'t chase trends. Every startup we touch is designed to outlast market cycles and compound value over decades.',
  },
  {
    title: 'Create ecosystem effects',
    text: 'Our portfolio companies share talent, technology, and distribution. Each new venture makes the others stronger.',
  },
];

export default function Vision() {
  return (
    <section id="vision" className="py-28 px-6 border-t border-neutral-200">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em]">
              Vision
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-[28px] md:text-[36px] font-heading font-semibold leading-[1.3] tracking-[-0.01em] text-black">
              We believe the best companies are built by people who care deeply
              about the problem, not just the opportunity.
            </p>
            <div className="mt-12 space-y-10">
              {pillars.map((item) => (
                <div key={item.title} className="border-l-2 border-neutral-200 pl-6 hover:border-black transition-colors duration-300">
                  <h3 className="text-[15px] font-semibold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-[1.7]">
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
