import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { VITE_API_HOST } = import.meta.env;
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch(`${VITE_API_HOST}friends/pending-list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	return { requests: response.json() };
};
