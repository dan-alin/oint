import type { PageServerLoad } from './$types';
export const prerender = false;
export const load: PageServerLoad = async (event) => {
	const { url } = event;
	const { VITE_API_HOST } = import.meta.env;
	let isInValid = undefined;
	const token = url.searchParams.get('token');
	const userId = url.searchParams.get('userId');
	if (userId && token) {
		const response = await fetch(`${VITE_API_HOST}registration/activate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, token })
		});
		isInValid = await response.json();
	}
	return { isInValid, userId, token };
};
