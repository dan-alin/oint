import type { PageServerLoad } from './appointments/$types';

export const load: PageServerLoad = async (event) => {
	return {
		prova: 'VITE_FIREBASE_API_KEY'
	};
};
