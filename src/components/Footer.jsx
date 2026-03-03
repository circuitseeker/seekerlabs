const socials = [
  { label: 'X', href: 'https://x.com/pradeep_9477' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pradeepvarma99/' },
  { label: 'Instagram', href: 'https://www.instagram.com/pradeep.helium/' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12 px-6">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="font-heading text-[15px] font-semibold tracking-tight text-black">
            SeekerLabs
          </span>
          <p className="text-[13px] text-neutral-400 mt-1">
            A combined alliance of CircuitSeekers & Program Bees. Est. 2021.
          </p>
        </div>
        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line text-[13px] font-medium text-neutral-400 hover:text-black transition-colors duration-200"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-[1120px] mx-auto mt-8 pt-8 border-t border-neutral-100">
        <p className="text-[13px] text-neutral-300">
          &copy; {new Date().getFullYear()} SeekerLabs
        </p>
      </div>
    </footer>
  );
}
