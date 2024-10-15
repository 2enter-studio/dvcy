export const load = async ({ request }) => {
	return { user_agent: request.headers.get('user-agent') };
};
