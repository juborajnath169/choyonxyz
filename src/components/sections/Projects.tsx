import { useState, useMemo } from 'react';
import { FolderOpen, ExternalLink, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { projects } from '@/config/portfolio';
import type { Project } from '@/config/portfolio';

type Filter = 'All Projects' | Project['category'];

const filters: Filter[] = ['All Projects', 'SEO', 'Web Development', 'Graphic Design'];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card/60 transition-all duration-300 hover:border-primary/40 hover:bg-bg-card/80">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — demo project`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />

        {/* Demo badge */}
        {project.isDemo && (
          <span className="absolute left-3 top-3 rounded-full glass-strong px-3 py-1 text-xs font-medium text-accent">
            Demo
          </span>
        )}

        {/* Category tag */}
        <span className="absolute right-3 top-3 rounded-full glass px-3 py-1 text-xs font-medium text-text-secondary">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-text-main">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-text-secondary">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-bg-secondary/50 px-2.5 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.url !== '#' && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            View Project
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All Projects');

  const filtered = useMemo(() => {
    if (activeFilter === 'All Projects') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="section-padding relative">
      <div className="pointer-events-none absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary">
            <FolderOpen size={14} className="text-accent" />
            Portfolio
          </div>
          <h2 className="section-title mt-4">Featured Projects</h2>
          <p className="section-subtitle">
            A collection of demo projects showcasing the type of work I do.
            Real projects will replace these soon.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'border border-border text-text-secondary hover:border-primary/40 hover:text-text-main'
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal delay={200} className="mt-8">
          <p className="flex items-center gap-2 text-sm text-text-secondary">
            <ArrowUpRight size={16} className="text-primary" />
            These are demo placeholders. To add a real project, edit the projects
            array in the configuration file.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
