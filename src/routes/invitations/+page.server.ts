import type { Appointment } from '../../models';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
	const { cookies } = event;
	const userToken = cookies.get('session');
	const response = await fetch('https://oint-ms.vercel.app/appointment/list/invitedMe', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	const resp = (await response.json()) as Appointment[];
	console.log(resp);

	return { invitationList: resp };
};
