import type { Appointment, FriendData } from '../../../models';
import type { PageServerLoad } from './$types';
import { API_HOST } from '$env/static/private';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies, params } = event;

	const userToken = cookies.get('session');
	const appointmentRes = await fetch(`${API_HOST}appointment/${params.appointmentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const appointment = (await appointmentRes.json()) as Appointment;

	const friendsRes = await fetch(`${API_HOST}friends/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const friends = (await friendsRes.json()) as FriendData[];

	return { appointment, friends };
};
