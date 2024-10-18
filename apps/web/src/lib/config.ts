const SIGN_TYPES = [0, 1, 2, 3, 4] as const;
const LOCALES = ['en', 'zh-tw'] as const;
const DEFAULT_LOCALE = 'zh-tw';

type SignType = (typeof SIGN_TYPES)[number];
type Locale = (typeof LOCALES)[number];

export { SIGN_TYPES, LOCALES, DEFAULT_LOCALE };
export type { SignType, Locale };
