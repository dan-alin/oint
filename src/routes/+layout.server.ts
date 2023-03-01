import type { PageServerLoad } from './$types';
import { VITE_FIREBASE_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async (event) => {
	console.log('ENV', VITE_FIREBASE_API_KEY);

	return {
		env: { env: VITE_FIREBASE_API_KEY }
	};
};
