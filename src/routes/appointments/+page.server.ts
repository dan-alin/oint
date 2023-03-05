import type { Appointment } from '../../models';

import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const myAppRes = await fetch('https://oint-ms.vercel.app/appointment/list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const myAppointments = (await myAppRes.json()) as Appointment[];

	const invitedAppRes = await fetch('https://oint-ms.vercel.app/appointment/list/invitedMe', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const invitedAppointments = (await invitedAppRes.json()) as Appointment[];

	return { myAppointments, invitedAppointments };
};
