import type { Action, Actions } from '@sveltejs/kit';
import fs from 'fs-extra';
import randomstring from 'randomstring';
import { broadcastMessage } from '@/server/ws';

export const ssr = false;

const submit: Action = async ({ request }) => {
	const formData = await request.formData();
	const dataUrl = formData.get('dataUrl') as string;
	const id = randomstring.generate(10);
	const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/);
	if (!matches) return;
	const buffer = Buffer.from(matches[2], 'base64');

	try {
		console.log(dataUrl);
		fs.writeFileSync(`./images/${id}.jpg`, buffer);
		broadcastMessage({ id });
	} catch (e) {
		console.error(e);
	}
	return { id };
};

export const actions: Actions = { submit };
