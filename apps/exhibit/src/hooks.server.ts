import { wsHandler } from '@/server/ws';
import type { Handle } from '@sveltejs/kit';

const handleWebsocket = wsHandler;

const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export { handle, handleWebsocket };
