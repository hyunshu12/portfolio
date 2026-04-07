# AGENTS.md

## Repository Overview
- Vite + React + TypeScript single-page profile site.
- Styling uses Tailwind CSS with class-based dark mode.
- Build output goes to `dist` and is post-processed by scripts.
- No lint/test tooling configured yet.

## Setup
- Install deps: `npm install`
- Node 18+ recommended (Vite 5 + TS 5).
- Package manager: npm (lockfile `package-lock.json`).

## Common Commands
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Typecheck only: `npx tsc -p tsconfig.app.json --noEmit`
- Vite config: `vite.config.ts`

## Build/Lint/Test Details
- Build runs `tsc` then `vite build`, then `node scripts/move-to-portfolio.js` and `node scripts/fix-asset-paths.js`.
- Lint: not configured (no eslint/prettier scripts).
- Tests: not configured (no test runner or scripts).
- Single test: N/A until a runner is added.
- If adding tests later, document the exact single-test command here.

## Build Output & Deployment
- Output directory is `dist` (see `vite.config.ts`).
- Base path is `/portfolio/`, so asset paths are rewritten.
- `scripts/move-to-portfolio.js` relocates build output to match hosting layout.
- `scripts/fix-asset-paths.js` adjusts asset URLs for deployment.
- Avoid hard-coded absolute asset paths in JSX/HTML.
- For static assets, prefer module imports (Vite handles bundling).

## Project Structure
- `src/main.tsx` bootstraps React root.
- `src/App.tsx` holds page layout and section composition.
- `src/components/*` contains presentational components (PascalCase filenames).
- `src/i18n/dict.ts` holds locale content and types.
- `src/styles/index.css` holds Tailwind directives and globals.
- `img/` stores local images/PDF assets referenced in code.
- `scripts/` contains build post-processing helpers.

## Code Style: General
- Use TypeScript with ES modules (`"type": "module"`).
- Follow existing 2-space indentation and trailing commas in multiline literals.
- Use single quotes for strings; include semicolons.
- Prefer `const` for values; use `let` only when reassigned.
- Keep functions small and focused; hoist helpers above component definitions.
- Avoid inline comments unless clarifying non-obvious logic.

## Imports
- Order imports: external packages, blank line, local modules.
- Use type-only imports with `import type` when importing only types.
- Keep relative import paths consistent (no alias configured).
- For assets, import from `../../img/...` or similar relative paths.
- Avoid dynamic `require`; use static `import` statements.

## React + JSX
- Use functional components with arrow functions.
- Destructure props in component signature.
- Use `useState`, `useEffect`, `useMemo` for state/side-effects/derived data.
- Keep hooks at top-level; avoid conditional hook calls.
- Keep JSX readable; break long props across lines.
- Prefer `key` props using stable identifiers.
- Keep sectioned layouts in `Section` components for consistency.

## Types
- Define props with `interface` or `type` in the same file.
- Use union types for enums (`type SkillLevel = ...`).
- Prefer explicit return types for exported helpers if unclear.
- Use `Record` for dictionary-like structures.
- Use `as const` for literal narrowing where needed.
- Avoid `any`; prefer `unknown` with explicit narrowing.

## Naming
- Components: `PascalCase` (e.g., `Header`, `ProjectCard`).
- Files: `PascalCase.tsx` for components, lower-case for styles/config.
- Variables/functions: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE` for shared static arrays/objects.
- Hooks: prefix with `use`.
- CSS utility classes: Tailwind classes in `className` strings.

## Styling (Tailwind)
- Prefer Tailwind utility classes in JSX.
- Use shared class tokens like `.glass-card` from `src/styles/index.css`.
- Dark mode uses `dark` class on `document.documentElement`.
- Avoid custom CSS unless a utility class cannot express the design.
- Maintain print styles inside `@media print` blocks in CSS.

## State + Persistence
- Locale is stored in `localStorage` under `locale`.
- Theme is stored in `localStorage` under `theme`.
- Guard browser-only APIs with `typeof window === 'undefined'`.
- Validate stored values before use; fall back to defaults.

## Error Handling / Runtime Guards
- Prefer early returns for invalid state.
- Avoid throwing in render; handle errors in data prep.
- Keep side effects inside `useEffect` hooks.

## Accessibility
- Provide `aria-label` for icon-only buttons.
- Use `aria-hidden="true"` for decorative icons.
- Ensure interactive elements are buttons/links as appropriate.
- Maintain focusable elements for keyboard navigation.

## Assets and External Links
- Place images/PDFs in `img/` and import them as modules.
- Use `target="_blank"` with `rel="noopener noreferrer"` for external links.
- Ensure asset paths remain compatible with `scripts/fix-asset-paths.js`.
- Keep PDF links in `dict` to local assets when possible.

## Internationalization
- Locale keys are `ko` and `en`.
- Keep `dict` structure consistent for both locales.
- Add new strings to both locales before use.
- Reuse `Locale` type from `src/i18n/dict.ts`.
- Prefer data-driven rendering via `dict` instead of hard-coded strings.

## Formatting Expectations
- No formatter is configured; keep formatting consistent manually.
- Match spacing/alignment in surrounding code.
- Keep line length reasonable; wrap long JSX props.
- Keep object keys aligned for readability in large data blocks.
- Avoid trailing whitespace.

## When Adding Tooling
- If adding lint/test tools, update `package.json` scripts.
- Add the exact command for single-test execution here.
- Document any new config files (e.g., `.eslintrc`, `vitest.config.ts`).
- Prefer `npm`-based scripts for consistency.

## Notes for Agents
- There are no Cursor rules in `.cursor/rules/` or `.cursorrules`.
- There are no Copilot rules in `.github/copilot-instructions.md`.
- Keep changes minimal and consistent with existing code.
- Avoid reformatting unrelated files.
- Update this file if tooling changes.

## Scripts Reference
- `scripts/move-to-portfolio.js` relocates output for hosting.
- `scripts/fix-asset-paths.js` rewrites asset URLs post-build.
- Scripts are Node ESM; keep `type: module` in `package.json`.
- Run scripts via `node` (no ts-node).

## PR/Commit Guidance
- Keep commits small and focused.
- Mention build/lint/test status explicitly in PRs.
- Note if tests are not run due to missing tooling.
