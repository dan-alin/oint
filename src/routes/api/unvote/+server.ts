import type { RequestEvent } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export async function POST({ request }: RequestEvent) {
	const vote = await request.json();
	console.log('unvote', vote);
	try {
		const response = await fetch(`${API_HOST}appointments/votes`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(vote)
		});
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
