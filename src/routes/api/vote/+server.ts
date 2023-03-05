import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const vote = await request.json();
	try {
		const response = await fetch('https://oint-ms.vercel.app/appointments/votes', {
			method: 'POST',
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
