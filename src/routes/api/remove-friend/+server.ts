import type { RequestEvent } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export async function DELETE({ request }: RequestEvent) {
	const friendToRemove = await request.json();

	try {
		const response = await fetch(`${API_HOST}friends/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(friendToRemove)
		});
		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
