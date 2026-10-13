import { Facebook, Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';
import { profile, social, navLinks } from '@/config/portfolio';

export default function Footer() {
  const socials = [
    { url: social.facebook, icon: Facebook, label: 'Facebook' },
    { url: social.github, icon: Github, label: 'GitHub' },
    { url: social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: social.twitter, icon: Twitter, label: 'Twitter' },
    { url: social.instagram, icon: Instagram, label: 'Instagram' },
  ].filter((s) => s.url.length > 0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/50 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold">
              <span className="text-gradient-primary">Choyon Nath</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-text-secondary">
              {profile.roles.join(' • ')}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-sm text-text-secondary transition-colors hover:text-text-main"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-card/50 text-text-secondary transition-all duration-200 hover:border-primary/40 hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} Choyon Nath. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-text-secondary transition-all hover:border-primary/40 hover:text-text-main"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
