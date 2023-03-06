import type { PhonePrefix } from '../../models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { VITE_API_HOST } = import.meta.env;
	const response = await fetch(`${VITE_API_HOST}phone-prefix`, {
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
