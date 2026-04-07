import { ArrowUpRight, ExternalLink } from 'lucide-react';
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

const sf = "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const sfDisplay = "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const ProjectCard = ({ index, title, subtitle, description, contributions, tags, links, contributionLabel, footer }: ProjectCardProps) => {
  return (
    <article
      className="apple-card portfolio-project-card flex flex-col gap-6"
      style={{ background: 'var(--color-card-bg)', padding: '32px', borderTop: '3px solid #0071e3' }}
    >
      {/* Index + Tags row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: sf,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'var(--color-card-tag-bg)',
                color: 'var(--color-card-tag-text)',
                borderRadius: '980px',
                padding: '3px 10px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {index !== undefined && (
          <span
            style={{
              fontFamily: sfDisplay,
              fontSize: '13px',
              fontWeight: 600,
              color: '#0071e3',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            {String(index).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Title + subtitle */}
      <div>
        <h3
          style={{
            fontFamily: sfDisplay,
            fontSize: '21px',
            fontWeight: 700,
            lineHeight: 1.19,
            letterSpacing: '-0.01em',
            color: 'var(--color-card-title)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: sf,
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.43,
            letterSpacing: '-0.014em',
            color: 'var(--color-card-subtitle)',
            marginTop: '4px',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: sf,
          fontSize: '17px',
          fontWeight: 400,
          lineHeight: 1.47,
          letterSpacing: '-0.022em',
          color: 'var(--color-card-body)',
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Contributions */}
      <div>
        <p
          style={{
            fontFamily: sf,
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-label-muted)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          {contributionLabel}
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {contributions.map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <ArrowUpRight
                style={{ width: '15px', height: '15px', color: '#0071e3', marginTop: '2px', flexShrink: 0 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: sf,
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.43,
                  letterSpacing: '-0.014em',
                  color: 'var(--color-card-body)',
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-card-divider)',
        }}
      >
        {links.map(({ label, href }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-primary"
              style={{ fontSize: '14px', padding: '6px 16px' }}
            >
              <ExternalLink style={{ width: '13px', height: '13px' }} aria-hidden="true" />
              {label}
            </a>
          ) : (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: sf,
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '-0.014em',
                color: 'var(--color-card-disabled)',
                padding: '6px 16px',
                borderRadius: '8px',
                border: '1px dashed var(--color-card-disabled-border)',
              }}
            >
              <ExternalLink style={{ width: '13px', height: '13px' }} aria-hidden="true" />
              {label}
            </span>
          ),
        )}
      </div>
      {footer}
    </article>
  );
};

export default ProjectCard;
