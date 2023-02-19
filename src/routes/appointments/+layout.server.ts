import type { Appointment } from '../../models';
import type { LayoutServerLoad } from '../appointments/$types';

export const prerender = false;

export const load: LayoutServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch('https://oint-ms.vercel.app/appointment/list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});
	const resp = (await response.json()) as Appointment[];

	return { appointments: resp };
};
