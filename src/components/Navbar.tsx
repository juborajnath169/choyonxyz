import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/config/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [],
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong border-b border-border/50 py-3'
            : 'border-b border-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="font-display text-xl font-bold tracking-tight text-text-main"
            aria-label="Choyon Nath — home"
          >
            <span className="text-gradient-primary">CN</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-text-main'
                      : 'text-text-secondary hover:text-text-main'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-text-main transition-colors hover:bg-white/5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="relative flex h-full flex-col items-center justify-center gap-2 px-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`w-full max-w-xs rounded-xl px-6 py-4 text-center text-lg font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? 'glass text-text-main'
                  : 'text-text-secondary hover:text-text-main hover:bg-white/5'
              }`}
              style={{
                animation: menuOpen
                  ? `slideUp 0.3s ease ${idx * 0.05}s forwards`
                  : undefined,
                opacity: menuOpen ? undefined : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
