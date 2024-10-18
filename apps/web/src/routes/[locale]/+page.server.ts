import type { Action, Actions } from '@sveltejs/kit';
import type { Locale } from '@/config';

import { redirect } from '@sveltejs/kit';

import { DEFAULT_LOCALE, LOCALES, SIGN_TYPES, type SignType } from '@/config';
import { pb } from '@/server/pb';

let signType: SignType = 0;

export const load = async ({ params }) => {
	signType = (~~(signType + Math.random() * 2 + 1) % SIGN_TYPES.length) as SignType;
	return { signType };
};

const submit: Action = async ({ request, params, cookies }) => {
	const source = cookies.get('source');
	const formData = await request.formData();
	const userAgent = request.headers.get('user-agent') as string;
	const signPic = formData.get('sign-pic') as string;
	const signType = formData.get('sign-type');
	const drawDuration = formData.get('draw-duration');

	const blob = await fetch(signPic).then((res) => res.blob());
	const paint = new File([blob], `${'sdkfjds'}.jpg`);
	const record = await pb.collection('paints').create({
		type: signType,
		draw_duration: drawDuration,
		user_agent: userAgent,
		source,
		paint
	});
	redirect(301, `${params.locale}/${record.id}`);
};

export const actions: Actions = { submit };
