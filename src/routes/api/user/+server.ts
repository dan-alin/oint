import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const user = await request.json();
	try {
		const response = await fetch('https://oint-ms.vercel.app/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const data = await response.json();
		return new Response(data.message, { status: data.statusCode });
	} catch (error: unknown) {
		console.log(error);
	}
}
