import clsx from 'classnames';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  contentClassName?: string;
  /** 'light' = #f5f5f7 bg, 'white' = white bg, 'dark' = always-dark bg */
  variant?: 'light' | 'white' | 'dark';
}

const Section = ({ id, title, description, children, contentClassName, variant = 'light' }: SectionProps) => {
  const bgClass =
    variant === 'dark'
      ? 'bg-black text-white'
      : variant === 'white'
        ? 'apple-section-white'
        : 'apple-section-light';

  const isBlock = contentClassName === 'block';

  return (
    <section id={id} className={clsx('scroll-mt-12 py-20', bgClass)}>
      <div className="mx-auto w-full max-w-[980px] px-6 lg:px-4">
        <header className="mb-10">
          {/* Accent dot */}
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#0071e3',
              marginBottom: '14px',
            }}
          />
          <h2
            className={clsx(
              'apple-section-title',
              variant === 'dark' ? 'text-white' : 'text-[#1d1d1f] dark:text-white',
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={clsx(
                'mt-4 apple-body max-w-2xl',
                variant === 'dark'
                  ? 'text-[rgba(255,255,255,0.72)]'
                  : 'text-[rgba(0,0,0,0.56)] dark:text-[rgba(255,255,255,0.56)]',
              )}
            >
              {description}
            </p>
          ) : null}
        </header>
        {isBlock
          ? <div>{children}</div>
          : <div className={clsx('grid gap-4', contentClassName)}>{children}</div>
        }
      </div>
    </section>
  );
};

export default Section;
