import type { Handle, HandleFetch } from '@sveltejs/kit';

const protectedPages = ['/events', '/appointments', '/friend-requests', '/search-friends'];

export const handle: Handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');
	const userToken = event.cookies.get('session');
	if (!userToken && protectedPages.includes(event.url.pathname)) {
		return Response.redirect(`${event.url.origin}/login`, 301);
	}

	if (!userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		userid = crypto.randomUUID();
		event.cookies.set('userid', userid, { path: '/' });
	}

	event.locals.userid = userid;

	return await resolve(event);
};
