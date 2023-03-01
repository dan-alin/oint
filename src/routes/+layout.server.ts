import { VITE_FIREBASE_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './appointments/$types';

export const load: PageServerLoad = async (event) => {
	console.log('ENV', VITE_FIREBASE_API_KEY);

	return {
		env: { env: VITE_FIREBASE_API_KEY }
	};
};
