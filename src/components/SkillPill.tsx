type SkillLevel = 'foundational' | 'intermediate' | 'advanced' | 'expert';

interface SkillPillProps {
  name: string;
  level: SkillLevel;
  label: string;
  tooltip?: string;
}

const LEVEL_PROGRESS: Record<SkillLevel, number> = {
  foundational: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
};

const LEVEL_DOT: Record<SkillLevel, number> = {
  foundational: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const sf = "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const SkillPill = ({ name, level, label, tooltip }: SkillPillProps) => {
  const progress = LEVEL_PROGRESS[level];
  const dots = LEVEL_DOT[level];

  return (
    <div
      className="apple-card portfolio-project-card"
      title={tooltip ?? label}
      style={{
        background: 'var(--color-card-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px 24px',
      }}
    >
      {/* Name + label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <span
          style={{
            fontFamily: sf,
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--color-skill-name)',
            letterSpacing: '-0.022em',
          }}
        >
          {name}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* 4-dot proficiency indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i <= dots ? '#0071e3' : 'var(--color-dot-empty)',
                  display: 'inline-block',
                  transition: 'background 0.2s ease',
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: sf,
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--color-skill-level)',
              letterSpacing: '-0.007em',
              minWidth: '60px',
              textAlign: 'right',
            }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '2px',
          borderRadius: '2px',
          background: 'var(--color-dot-empty)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0071e3, #2997ff)',
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
};

export default SkillPill;
