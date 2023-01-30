import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const response = await fetch('https://oint-ms.vercel.app/appointment/list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const appointments = await response.json();
	console.log('appointments', appointments);

	return {
		appointments
	};
};
