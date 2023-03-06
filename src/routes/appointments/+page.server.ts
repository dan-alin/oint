import type { Appointment } from '../../models';
import type { PageServerLoad } from './$types';
import { API_HOST } from '$env/static/private';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const myAppRes = await fetch(`${API_HOST}appointment/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const myAppointments = (await myAppRes.json()) as Appointment[];

	const invitedAppRes = await fetch(`${API_HOST}appointment/list/invitedMe`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const invitedAppointments = (await invitedAppRes.json()) as Appointment[];

	return { myAppointments, invitedAppointments };
};
