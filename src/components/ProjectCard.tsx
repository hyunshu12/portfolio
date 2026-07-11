import type { ReactNode } from 'react';

interface ProjectLink {
  label: string;
  href?: string;
}

interface ProjectCardProps {
  index?: number;
  title: string;
  subtitle: string;
  description: string;
  contributions: string[];
  tags: string[];
  links: ProjectLink[];
  contributionLabel: string;
  footer?: ReactNode;
}

/** 실적 목록의 한 항목 — 서지(書誌) 형식. 호버하면 검출 프레임이 잠긴다. */
const ProjectCard = ({
  index,
  title,
  subtitle,
  description,
  contributions,
  tags,
  links,
  contributionLabel,
  footer,
}: ProjectCardProps) => {
  return (
    <article className="record-entry">
      <span className="det-corner det-corner--tl" aria-hidden="true" />
      <span className="det-corner det-corner--tr" aria-hidden="true" />
      <span className="det-corner det-corner--bl" aria-hidden="true" />
      <span className="det-corner det-corner--br" aria-hidden="true" />

      <div className="record-head">
        <span className="record-no">{index !== undefined ? String(index).padStart(2, '0') : '—'}</span>
        <div>
          <h3 className="record-title">{title}</h3>
          <p className="record-venue">{subtitle}</p>
        </div>
      </div>

      <div className="record-body sm:pl-[46px]">
        <p className="record-desc">{description}</p>

        <p className="record-contrib-label">{contributionLabel}</p>
        <ul className="record-contrib">
          {contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="record-foot">
          <div className="record-tags">
            {tags.map((tag) => (
              <span key={tag} className="record-tag">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {links.map(({ label, href }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ref-link">
                  {label} ↗
                </a>
              ) : (
                <span key={label} className="ref-dead">
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
        {footer}
      </div>
    </article>
  );
};

export default ProjectCard;
