import { Languages, Moon, Sun } from 'lucide-react';

import profileImage from '../../img/1126조현수.jpg';
import type { Locale } from '../i18n/dict';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
  currentLocale: Locale;
  onToggleLocale: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const Header = ({ navItems, currentLocale, onToggleLocale, isDark, onToggleTheme }: HeaderProps) => {
  return (
    <header className="apple-nav sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between gap-4 px-6 h-12 lg:px-4">
        {/* Logo / Profile */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 shrink-0"
          style={{ color: '#ffffff', textDecoration: 'none' }}
        >
          <img
            src={profileImage}
            alt="Hyunsoo Cho"
            className="h-7 w-7 rounded-full object-cover"
            style={{ opacity: 0.9 }}
          />
          <span
            className="hidden sm:block"
            style={{
              fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.01em',
            }}
          >
            Hyunsoo Cho
          </span>
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.85)',
                padding: '4px 12px',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)'; }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onToggleLocale}
            aria-label="Toggle language"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
          >
            <Languages style={{ width: '13px', height: '13px' }} aria-hidden="true" />
            <span className="uppercase">{currentLocale}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 8px',
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
          >
            {isDark
              ? <Sun style={{ width: '13px', height: '13px' }} aria-hidden="true" />
              : <Moon style={{ width: '13px', height: '13px' }} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile nav — scrollable pill row */}
      <div
        className="md:hidden px-4 pb-2 pt-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0"
              style={{
                fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.75)',
                padding: '3px 10px',
                borderRadius: '4px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
