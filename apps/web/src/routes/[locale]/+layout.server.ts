import { DEFAULT_LOCALE, type Locale, LOCALES } from '@/config';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	let locale = params.locale as Locale;
	if (!locale || !LOCALES.includes(locale)) redirect(301, `/${DEFAULT_LOCALE}`);
	return { locale, source: cookies.get('source') ?? 'unknown' };
};
