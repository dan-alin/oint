import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	const changeVotes = await request.json();
	const { VITE_API_HOST } = import.meta.env;

	try {
		const response = await fetch(`${VITE_API_HOST}appointments/votes/change`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(changeVotes)
		});
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
