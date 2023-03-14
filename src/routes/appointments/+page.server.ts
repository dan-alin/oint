import type { Appointment, InvitedAppointment } from '../../models';
import type { Notification } from '../../models/notification';
import type { PageServerLoad } from './$types';
//

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const { VITE_API_HOST } = import.meta.env;
	const myAppRes = await fetch(`${VITE_API_HOST}appointment/list`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const myAppointments = (await myAppRes.json()) as Appointment[];

	const invitedAppRes = await fetch(`${VITE_API_HOST}appointment/list/invitedMe`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const invitedAppointments = (await invitedAppRes.json()) as InvitedAppointment[];

	const noticationsUnreadRes = await fetch(`${VITE_API_HOST}notification/unread`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const notificationsUnread = (await noticationsUnreadRes.json()) as Notification[];

	return { myAppointments, invitedAppointments, notificationsUnread };
};
