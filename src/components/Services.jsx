import { useStaggerReveal } from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Software Development',
    description:
      'Full-stack web and mobile apps, cloud infrastructure, APIs, and scalable platforms. Production-grade engineering, startup speed.',
  },
  {
    num: '02',
    title: 'Hardware & IoT',
    description:
      'Embedded systems, prototyping, PCB design, and connected device development. From concept to manufacturing-ready hardware.',
  },
  {
    num: '03',
    title: 'AI & ML Solutions',
    description:
      'Custom model training, computer vision, NLP, predictive analytics, and AI-powered automation. Intelligence built into your product.',
  },
  {
    num: '04',
    title: 'Product & Deployment',
    description:
      'End-to-end product lifecycle. Ideation, architecture, development, testing, CI/CD, and production deployment. We ship and we maintain.',
  },
];

export default function Services() {
  const listRef = useStaggerReveal(0.06);

  return (
    <section id="services" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">Services</div>
          </div>
          <div className="md:col-span-9" ref={listRef}>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="brutal-card p-7 stagger-child"
                >
                  <span className="font-heading text-[11px] font-bold text-[#C8943E] bg-[#4A6274] inline-block px-2 py-1 mb-4 tracking-wider">
                    {service.num}
                  </span>
                  <h3 className="text-[16px] font-heading font-bold text-[#4A6274] mb-3 tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-[#4A6274]/60 leading-[1.75]">
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
