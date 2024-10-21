import sharp from 'sharp';
import bufferToDataUrl from 'buffer-to-data-url';

import { pb } from '@/server/pb';
import { SignImage } from '@repo/lib/pb';
import { SIGN_SIZES } from '@/config';

export const load = async ({ params }) => {
	const { id } = params;

	const image = new SignImage(pb, id);
	const buffer = await image.getBuffer();
	const type = await image.getType();
	if (!type || !buffer) return {};

	const resized = await sharp(buffer).resize(SIGN_SIZES[type][0], SIGN_SIZES[type][1], { position: 'center' }).toBuffer();
	const imgUrl = await bufferToDataUrl('image/jpeg', resized);

	return { imgUrl, id };
};

export const ssr = false;
