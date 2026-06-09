'use client';

/**
 * Kiosk language context.
 *
 * The kiosk displays ONE language at a time (default Indonesian). A toggle in
 * the navbar switches between Indonesian and English. All screens consume the
 * current language through {@link useLang}; the `t(caption)` helper returns the
 * string for the active language from a bilingual `{ id, en }` caption.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Caption } from '../content/i18n';

export type Lang = 'id' | 'en';

interface LanguageContextValue {
  /** The active language. */
  lang: Lang;
  /** Set the active language explicitly. */
  setLang: (lang: Lang) => void;
  /** Toggle between Indonesian and English. */
  toggle: () => void;
  /** Resolve a bilingual caption to the active-language string. */
  t: (caption: Caption) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initial = 'id',
}: {
  children: ReactNode;
  initial?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initial);
  const toggle = useCallback(() => setLang((l) => (l === 'id' ? 'en' : 'id')), []);
  const t = useCallback((caption: Caption) => caption[lang], [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t }),
    [lang, toggle, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Access the active kiosk language and helpers. */
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return ctx;
}
