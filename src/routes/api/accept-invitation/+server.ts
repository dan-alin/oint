import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const appointmentId = await request.json();
	const { VITE_API_HOST } = import.meta.env;

	try {
		const response = await fetch(`${VITE_API_HOST}appointment/invitation/accept`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(appointmentId)
		});
		const data = await response.json();

		return new Response(JSON.stringify(data), { status: data.statusCode });
	} catch (error: unknown) {
		console.log(error);
	}
}
