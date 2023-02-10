import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;

	const userToken = cookies.get('session');
	const response = await resolve(event);
	return response;
};
