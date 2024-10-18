export const load = async ({ url, cookies }) => {
	const params = url.searchParams;
	const source = params.get('source') ?? 'unknown';
	if (cookies.get('source')) return;
	cookies.set('source', source, { path: '/', maxAge: 60 * 60 });
};
