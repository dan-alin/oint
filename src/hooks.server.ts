import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	console.log(cookies);

	const userToken = cookies.get('session');
	console.log(userToken);
	const response = await resolve(event);
	return response;
};

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	request.headers.set('cookie', event.request.headers.get('cookie') || '');
	console.log(request);
	return fetch(request);
};
