import { makePBAdmin } from '@repo/lib/pb';
import * as Envs from '$env/static/private';

const pb = await makePBAdmin(Envs);

export { pb };
