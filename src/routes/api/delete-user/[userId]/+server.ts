import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ request, params }: RequestEvent) {
	const { VITE_API_HOST } = import.meta.env;

	const { userId } = params;

	try {
		const response = await fetch(`${VITE_API_HOST}users/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			}
		});
		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
