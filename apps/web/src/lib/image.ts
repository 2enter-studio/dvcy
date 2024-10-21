import sharp from 'sharp';
import type { SignType } from '@/config';

async function makeSignImage(paint: ArrayBuffer, signType: SignType) {
	const overlay = await sharp(`./static/images/signs/0${signType + 1}.png`).toBuffer();

	const buffer = await sharp(paint)
		.composite([
			{
				input: overlay,
				gravity: 'center'
			}
		])
		.toBuffer();

	const blob = new Blob([buffer]);

	return new File([blob], 'sign.jpg');
}

export { makeSignImage };
