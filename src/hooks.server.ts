import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	console.log(cookies);

	const userToken = cookies.get('session');
	console.log(userToken);
	const response = await resolve(event);
	return response;
};
