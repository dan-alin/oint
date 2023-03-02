import type { FriendData } from '../../models/friend-requests';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch('https://oint-ms.vercel.app/friends/list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const resp = (await response.json()) as FriendData[];
	console.log(resp);

	return { friendList: resp };
};
