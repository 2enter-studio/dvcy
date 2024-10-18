const SIGN_TYPES = [0, 1, 2, 3, 4] as const;
const LOCALES = ['en', 'zh-tw'];

type SignType = (typeof SIGN_TYPES)[number];
type Locale = (typeof SIGN_TYPES)[number];

export { SIGN_TYPES, LOCALES };
export type { SignType, Locale };
