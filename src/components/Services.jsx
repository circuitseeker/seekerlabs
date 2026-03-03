const services = [
  {
    title: 'Software Development',
    description: 'Full-stack web and mobile apps, cloud infrastructure, APIs, and scalable platforms. Production-grade engineering, startup speed.',
  },
  {
    title: 'Hardware & IoT',
    description: 'Embedded systems, prototyping, PCB design, and connected device development. From concept to manufacturing-ready hardware.',
  },
  {
    title: 'AI & ML Solutions',
    description: 'Custom model training, computer vision, NLP, predictive analytics, and AI-powered automation. Intelligence built into your product.',
  },
  {
    title: 'Product Development & Deployment',
    description: 'End-to-end product lifecycle. Ideation, architecture, development, testing, CI/CD, and production deployment. We ship and we maintain.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 border-t border-neutral-200">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em]">
              Services
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
              {services.map((service) => (
                <div key={service.title} className="hover-shift">
                  <h3 className="text-[15px] font-semibold text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-[1.7]">
                    {service.description}
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
