import type { FriendData, FriendRequests } from '../../models';

import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;
	const friendsRes = await fetch(`${VITE_API_HOST}friends/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	const myFriends = (await friendsRes.json()) as FriendData[];

	const friendRequestRes = await fetch(`${VITE_API_HOST}friends/pending-list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	const friendRequest = (await friendRequestRes.json()) as FriendRequests[];

	const noticationsUnreadRes = await fetch(`${VITE_API_HOST}notification/unread`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const notificationsUnread = (await noticationsUnreadRes.json()) as Notification[];

	return { myFriends, friendRequest, notificationsUnread };
};
