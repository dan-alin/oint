import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const cookies = event.request.headers.get('cookie');
	const userToken = cookies?.split(';').reduce((prev: Record<string, string>, current) => {
		const [name, value] = current.trim().split('=');
		return { ...prev, [name]: value };
	}, {});
	const session = userToken?.session;
	console.log(session);
	const response = await fetch('https://oint-ms.vercel.app/friends/pending-list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session}`
		}
	});

	return { requests: await response.json() };
};
