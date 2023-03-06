import type { Appointment, FriendData } from '../../../models';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies, params } = event;
	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;
	const appointmentRes = await fetch(`${VITE_API_HOST}appointment/${params.appointmentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const appointment = (await appointmentRes.json()) as Appointment;

	const friendsRes = await fetch(`${VITE_API_HOST}friends/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const friends = (await friendsRes.json()) as FriendData[];

	return { appointment, friends };
};
