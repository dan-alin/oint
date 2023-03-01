import { VITE_FIREBASE_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './appointments/$types';

export const load: PageServerLoad = async (event) => {
	const a = VITE_FIREBASE_API_KEY[0];
	return {
		VITE_FIREBASE_API_KEY: !!a
	};
};
