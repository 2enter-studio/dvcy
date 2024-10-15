import type { Action, Actions } from '@sveltejs/kit';

const submit: Action = async ({ request }) => {
	const formData = await request.formData();
	const userAgent = request.headers.get('user-agent') as string;
	console.log(formData.get('file'));
	console.log(userAgent);
};

export const actions: Actions = { submit };
