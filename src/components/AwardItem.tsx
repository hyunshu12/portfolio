interface AwardItemProps {
  year: string;
  title: string;
  description?: string;
  isLast?: boolean;
}

const sf = "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const sfDisplay = "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const AwardItem = ({ year, title, description, isLast }: AwardItemProps) => {
  return (
    <li
      style={{
        listStyle: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '24px',
        padding: '24px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--color-card-divider)',
      }}
    >
      {/* Year badge */}
      <div style={{ flexShrink: 0, paddingTop: '2px' }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: sf,
            fontSize: '11px',
            fontWeight: 600,
            color: '#0071e3',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(0, 113, 227, 0.08)',
            borderRadius: '6px',
            padding: '4px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          {year}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: sfDisplay,
            fontSize: '17px',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.018em',
            color: 'var(--color-award-title)',
            margin: 0,
          }}
        >
          {title}
        </p>
        {description ? (
          <p
            style={{
              fontFamily: sf,
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--color-award-desc)',
              lineHeight: 1.5,
              letterSpacing: '-0.014em',
              margin: '6px 0 0 0',
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {/* Trophy icon */}
      <div style={{ flexShrink: 0, paddingTop: '2px', opacity: 0.3 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0071e3', opacity: 1 }}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      </div>
    </li>
  );
};

export default AwardItem;
