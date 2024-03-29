import type { PageServerLoad } from './$types';

type ConfirmPageParams = {
	userId: string;
	token: string;
};

// TODO: check how to type params
export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const params = event.params as unknown as ConfirmPageParams;

	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;

	const isTokenValidResponse = await fetch(`${VITE_API_HOST}registration/activate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		},
		body: JSON.stringify({ userId: params?.userId, code: params?.token })
	});

	const isTokenValid = await isTokenValidResponse.json();

	return { isTokenValid };
};
