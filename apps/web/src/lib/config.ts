const SIGN_TYPES = [0, 1, 2, 3, 4] as const;
const SIGN_SIZES = [
	[569, 2048],
	[2047, 1018],
	[2048, 2048],
	[1668, 2045],
	[816, 2045]
] as const;
const DEFAULT_LOCALE = 'zh-tw';
const LOCALES = ['en', 'zh-tw'] as const;
const CANVAS_SIZE = 2048;
const ROUTES = [
	{ name: '中文', locale: 'zh-tw' },
	{ name: 'English', locale: 'en' }
] as const;

type SignType = (typeof SIGN_TYPES)[number];
type Locale = (typeof LOCALES)[number];

export { SIGN_TYPES, LOCALES, DEFAULT_LOCALE, CANVAS_SIZE, ROUTES, SIGN_SIZES };
export type { SignType, Locale };
