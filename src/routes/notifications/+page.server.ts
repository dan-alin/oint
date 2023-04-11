import type { Notification } from '../../models/notification';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;
	const myAppRes = await fetch(`${VITE_API_HOST}notification/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const myNotifications = (await myAppRes.json()) as Notification[];
	console.log(myNotifications);

	return { myNotifications };
};
