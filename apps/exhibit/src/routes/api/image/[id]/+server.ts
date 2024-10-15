import fs from 'fs-extra';

export const GET = async ({ params }) => {
	const { id } = params;
	const image = fs.readFileSync(`./images/${id}.jpg`);
	return new Response(image, {
		headers: {
			'content-type': 'image/png'
		}
	});
};
