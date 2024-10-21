const SIGN_TYPES = [0, 1, 2, 3, 4] as const;
const LOCALES = ['en', 'zh-tw'] as const;
const DEFAULT_LOCALE = 'zh-tw';
const SIGN_SIZE = 2048;
const ROUTES = [
	{ name: '中文', locale: 'zh-tw' },
	{ name: 'English', locale: 'en' }
] as const;

type SignType = (typeof SIGN_TYPES)[number];
type Locale = (typeof LOCALES)[number];

export { SIGN_TYPES, LOCALES, DEFAULT_LOCALE, SIGN_SIZE, ROUTES };
export type { SignType, Locale };
