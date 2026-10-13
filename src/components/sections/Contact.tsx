import { Facebook, Mail, Github, Linkedin, Twitter, Instagram, MessageSquare } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { profile, social } from '@/config/portfolio';

type SocialLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};

export default function Contact() {
  const emailConfigured = profile.email.length > 0;

  const socials: SocialLink[] = [
    { url: social.facebook, icon: Facebook, label: 'Facebook' },
    { url: social.github, icon: Github, label: 'GitHub' },
    { url: social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: social.twitter, icon: Twitter, label: 'Twitter' },
    { url: social.instagram, icon: Instagram, label: 'Instagram' },
  ].filter((s) => s.url.length > 0);

  return (
    <section id="contact" className="section-padding relative">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mb-10 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary">
            <MessageSquare size={14} className="text-accent" />
            Let's Talk
          </div>
          <h2 className="section-title mt-4">Let's Work Together</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Have a project in mind or just want to say hello? I'm always open to
            discussing new opportunities and collaborations.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Facebook contact card */}
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-bg-card/60 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-bg-card/80"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg-secondary transition-colors duration-300 group-hover:border-primary/40">
                <Facebook size={26} className="text-[#1877F2]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-text-main">
                  Facebook
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Send me a message on Facebook — I respond promptly.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                  Open Facebook profile
                  <Mail size={14} />
                </span>
              </div>
            </a>

            {/* Email contact card */}
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-bg-card/60 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg-secondary">
                <Mail size={26} className="text-primary" />
              </div>
              {emailConfigured ? (
                <div>
                  <h3 className="font-display text-lg font-bold text-text-main">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    Reach out directly via email.
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    {profile.email}
                  </a>
                </div>
              ) : (
                <div>
                  <h3 className="font-display text-lg font-bold text-text-main">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    Email contact will be available soon. For now, please reach me
                    via Facebook.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary">
                    Email not yet configured
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional social links */}
          {socials.length > 1 && (
            <Reveal delay={200} className="mt-8">
              <p className="text-center text-sm text-text-secondary">
                Find me on other platforms:
              </p>
              <div className="mt-4 flex justify-center gap-3">
                {socials.map((s) => {
                  if (s.label === 'Facebook') return null;
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-card/50 text-text-secondary transition-all duration-200 hover:border-primary/40 hover:text-primary"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          )}
        </Reveal>
      </div>
    </section>
  );
}
