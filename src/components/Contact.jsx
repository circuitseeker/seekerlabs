const contacts = [
  { label: 'Email', value: 'info@seekerlab.in', href: 'mailto:info@seekerlab.in' },
  { label: 'Phone', value: '+91 888 492 3815', href: 'tel:+918884923815' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 border-t border-neutral-200">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <h2 className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em]">
              Contact
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-[28px] md:text-[36px] font-heading font-semibold leading-[1.3] tracking-[-0.01em] text-black">
              Let's build something together.
            </p>
            <p className="mt-8 text-[15px] text-neutral-500 leading-[1.75]">
              Have an idea worth building? Reach out and we'll get back to you
              within 24 hours.
            </p>

            <div className="mt-12 space-y-8">
              {contacts.map((item) => (
                <div key={item.label}>
                  <p className="text-[13px] font-medium text-neutral-400 uppercase tracking-[0.12em] mb-2">{item.label}</p>
                  <a
                    href={item.href}
                    className="hover-line text-[15px] font-semibold text-black"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
