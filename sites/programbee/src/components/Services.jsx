import { useStaggerReveal } from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Full-Stack Web Development',
    description:
      'React, Next.js, Node.js, Python, Go. We build fast, responsive, and scalable web applications. From landing pages to complex SaaS platforms.',
  },
  {
    num: '02',
    title: 'Mobile App Development',
    description:
      'Flutter, React Native, and native Swift/Kotlin. Cross-platform or native apps that feel buttery smooth and ship on time.',
  },
  {
    num: '03',
    title: 'AI & Machine Learning',
    description:
      'Custom model training, computer vision, NLP, predictive analytics, LLM integrations, and AI-powered features baked into your product.',
  },
  {
    num: '04',
    title: 'Cloud & DevOps',
    description:
      'AWS, GCP, Azure, Cloudflare. Infrastructure as code, CI/CD pipelines, Kubernetes, Docker. We architect for reliability and scale.',
  },
  {
    num: '05',
    title: 'APIs & Backend Systems',
    description:
      'REST, GraphQL, WebSockets, microservices. High-performance backends that handle millions of requests with grace.',
  },
  {
    num: '06',
    title: 'MVP & Rapid Prototyping',
    description:
      'Idea to working product in weeks, not months. We validate fast, iterate faster, and build things that founders can take to market and investors.',
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
                  <span className="font-heading text-[12px] font-bold text-[#0a0a0a] inline-block mb-4 tracking-wider border-b-[3px] border-[#FFB74D] pb-1">
                    {service.num}
                  </span>
                  <h3 className="text-[16px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-[1.75]">
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
