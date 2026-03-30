const Footer = () => {
  return (
    <footer className="border-t border-foreground/[0.06] py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading italic text-lg text-foreground/60">
          BrewHaus
        </span>
        <p className="font-body font-light text-foreground/30 text-xs">
          © 2026 BrewHaus Delhi. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-foreground/30 text-xs hover:text-foreground/60 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
