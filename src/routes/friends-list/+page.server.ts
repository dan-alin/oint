import type { FriendData } from '../../models/friend-requests';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;
	const response = await fetch(`${VITE_API_HOST}friends/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const resp = (await response.json()) as FriendData[];

	return { friendList: resp };
};
