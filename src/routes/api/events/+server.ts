import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ request }: RequestEvent) {
	try {
		const response = await fetch('https://oint-ms.vercel.app/places?search=via%20del%20corso', {
			method: 'GET',
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
