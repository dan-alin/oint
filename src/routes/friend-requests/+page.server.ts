import type { PageServerLoad } from './$types';
export const prerender = true;
export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch('https://oint-ms.vercel.app/friends/pending-list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	return { requests: response.json() };
};
