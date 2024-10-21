import { SignImage } from '@repo/lib/pb';
import { pb } from '@/server/pb';

export const GET = async ({ params }) => {
	const { id } = params;
	const image = new SignImage(pb, id);
	const buffer = await image.getBuffer();

	return new Response(buffer, {
		headers: {
			'content-type': 'image/jpeg'
		}
	});
};
