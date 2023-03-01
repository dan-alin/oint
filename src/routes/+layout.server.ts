import { VITE_FIREBASE_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './appointments/$types';

export const load: PageServerLoad = async (event) => {
	return {
		VITE_FIREBASE_API_KEY: 'ciao' + VITE_FIREBASE_API_KEY
	};
};
