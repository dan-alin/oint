import type { RequestEvent } from '@sveltejs/kit';

export async function DELETE({ request }: RequestEvent) {
	const { VITE_API_HOST } = import.meta.env;

	const invitationToDelete = await request.json();

	try {
		const response = await fetch(`${VITE_API_HOST}appointment/invitation/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(invitationToDelete)
		});
		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
