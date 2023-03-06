import type { PhonePrefix } from '../../models';
import type { PageServerLoad } from './$types';
import { API_HOST } from '$env/static/private';

export const load: PageServerLoad = async (event) => {
	const response = await fetch(`${API_HOST}phone-prefix`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const phonePrefixes = ((await response.json()) as PhonePrefix[]).map((phonePrefix) => ({
		text: `${phonePrefix.regionCode} ${phonePrefix.prefix}`,
		value: phonePrefix.prefix
	}));

	return {
		phonePrefixes
	};
};
