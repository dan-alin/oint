import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const { VITE_API_HOST } = import.meta.env;
	const user = await request.json();

	try {
		const response = await fetch(`${VITE_API_HOST}users`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(user)
		});
		const data = await response.json();
		return new Response(JSON.stringify(data), { status: data.statusCode });
	} catch (error: unknown) {
		console.log(error);
	}
}
