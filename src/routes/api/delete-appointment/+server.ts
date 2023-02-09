import type { RequestEvent } from '@sveltejs/kit';

export async function DELETE({ request }: RequestEvent) {
	const appointmentToDelete = await request.json();
	try {
		const response = await fetch('https://oint-ms.vercel.app/appointment/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(appointmentToDelete)
		});
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
