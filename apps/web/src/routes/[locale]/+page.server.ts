import type { Action, Actions } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

import { DEFAULT_LOCALE, SIGN_TYPES, type SignType } from '@/config';
import { pb } from '@/server/pb';
import { makeSignImage } from '@/image';

let signType: SignType = 0;

export const load = async () => {
	signType = (~~(signType + Math.random() * 2 + 1) % SIGN_TYPES.length) as SignType;
	return { signType };
};

const submit: Action = async ({ request, params, cookies }) => {
	const source = cookies.get('source') ?? 'unknown';
	const formData = await request.formData();
	const signPic = formData.get('sign-pic') as string;
	const type = parseInt(formData.get('sign-type') as string) as SignType;
	const draw_duration = formData.get('draw-duration');
	const user_agent = request.headers.get('user-agent') as string;

	const blob = await fetch(signPic).then((res) => res.blob());
	const buffer = await fetch(signPic).then((res) => res.arrayBuffer());

	const paint = new File([blob], 'paint.jpg');
	const sign = await makeSignImage(buffer, type);
	const locale = params.locale ?? DEFAULT_LOCALE;

	const record = await pb.collection('paints').create({
		type,
		draw_duration,
		user_agent,
		source,
		paint,
		sign,
		locale
	});
	redirect(308, `${locale}/${record.id}`);
	// return { id: record.id };
};

export const actions: Actions = { submit };

export const ssr = false;
