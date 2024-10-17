const SIGN_TYPES = [0, 1, 2, 3, 4] as const;
type SignType = (typeof SIGN_TYPES)[number];

export { SIGN_TYPES };
export type { SignType };
