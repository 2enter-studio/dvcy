import { pb } from '@/server/pb';
import { SignImage } from '@repo/lib/pb';

export const load = async ({ params }) => {
	const { id } = params;

	const image = new SignImage(pb, id);
	const imgUrl = await image.getUrl();

	return { imgUrl, id };
};

export const ssr = false;
