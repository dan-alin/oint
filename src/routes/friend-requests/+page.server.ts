import type { PageServerLoad } from './$types';
import { API_HOST } from '$env/static/private';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch(`${API_HOST}friends/pending-list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	return { requests: response.json() };
};
