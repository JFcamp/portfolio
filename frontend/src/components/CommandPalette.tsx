import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft, Hash, FolderGit2, Sparkles } from 'lucide-react';
import { useProjects } from '@/data/projects';
import { cn } from '@/utils/cn';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onAskAi: (query: string) => void;
}

type Item =
  | { kind: 'section'; id: string; label: string }
  | { kind: 'project'; slug: string; label: string; hasCaseStudy: boolean }
  | { kind: 'ai'; label: string };

const SECTIONS: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function CommandPalette({ open, setOpen, onAskAi }: CommandPaletteProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projects = useProjects();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut: Ctrl/Cmd + K toggles the palette.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const q = query.trim().toLowerCase();
    const sectionItems: Item[] = SECTIONS.filter((s) => !q || s.label.toLowerCase().includes(q)).map(
      (s) => ({ kind: 'section', id: s.id, label: s.label }),
    );
    const projectItems: Item[] = projects
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .map((p) => ({
        kind: 'project',
        slug: p.slug,
        label: p.name,
        hasCaseStudy: Boolean(p.caseStudy),
      }));
    const aiItem: Item[] = q ? [{ kind: 'ai', label: q }] : [];
    return [...sectionItems, ...projectItems, ...aiItem];
  }, [query, projects]);

  const run = (item: Item) => {
    setOpen(false);
    if (item.kind === 'section') {
      navigate('/');
      setTimeout(
        () => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }),
        60,
      );
    } else if (item.kind === 'project') {
      if (item.hasCaseStudy) navigate(`/projects/${item.slug}`);
      else {
        navigate('/');
        setTimeout(
          () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
          60,
        );
      }
    } else {
      onAskAi(item.label);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && items[active]) {
      e.preventDefault();
      run(items[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg-card shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search size={16} className="text-content-secondary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={t('palette.placeholder')}
                className="w-full bg-transparent py-3.5 text-sm text-content-primary placeholder:text-content-secondary focus:outline-none"
              />
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {items.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-content-secondary">
                  {t('palette.empty')}
                </p>
              )}
              {items.map((item, i) => (
                <button
                  key={`${item.kind}-${item.kind === 'project' ? item.slug : item.label}-${i}`}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm',
                    active === i ? 'bg-accent/10 text-content-primary' : 'text-content-secondary',
                  )}
                >
                  {item.kind === 'section' && <Hash size={15} className="text-accent" />}
                  {item.kind === 'project' && <FolderGit2 size={15} className="text-accent" />}
                  {item.kind === 'ai' && <Sparkles size={15} className="text-accent" />}
                  <span className="truncate">
                    {item.kind === 'ai' ? (
                      <>
                        <span className="text-content-secondary">{t('palette.askPrefix')} </span>
                        {item.label}
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                  {active === i && (
                    <CornerDownLeft size={13} className="ml-auto text-content-secondary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
