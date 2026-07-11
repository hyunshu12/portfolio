import { Moon, Sun } from 'lucide-react';

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
    <header className="rec-nav no-print">
      <div className="rec-container flex h-14 items-center justify-between gap-4">
        <a href="#hero" className="rec-brand shrink-0">
          <span className="rec-brand-frame">
            <span className="rec-brand-corner rec-brand-corner--tl" aria-hidden="true" />
            <span className="rec-brand-corner rec-brand-corner--tr" aria-hidden="true" />
            <span className="rec-brand-corner rec-brand-corner--bl" aria-hidden="true" />
            <span className="rec-brand-corner rec-brand-corner--br" aria-hidden="true" />
            {currentLocale === 'ko' ? '조현수' : 'Hyunsoo Cho'}
          </span>
          <span className="rec-brand-sub hidden sm:block">RESEARCH RECORD</span>
        </a>

        <nav className="hidden flex-1 items-center justify-end gap-0.5 md:flex" aria-label="주요 섹션">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="rec-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            className="rec-ctrl"
            onClick={onToggleLocale}
            aria-label={currentLocale === 'ko' ? 'Switch to English' : '한국어로 전환'}
          >
            {currentLocale === 'ko' ? 'EN' : 'KO'}
          </button>
          <button
            type="button"
            className="rec-ctrl"
            onClick={onToggleTheme}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDark ? <Sun size={13} aria-hidden="true" /> : <Moon size={13} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* 모바일: 가로 스크롤 내비게이션 */}
      <div className="md:hidden" style={{ borderTop: '1px solid var(--line-soft)' }}>
        <div className="rec-container no-scrollbar flex items-center gap-0.5 overflow-x-auto py-1.5">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="rec-nav-link text-xs">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
