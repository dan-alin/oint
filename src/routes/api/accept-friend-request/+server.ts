import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const friendId = await request.json();
	try {
		const response = await fetch('https://oint-ms.vercel.app/friends/accept-friend-request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: request.headers.get('Authorization') || ''
			},
			body: JSON.stringify(friendId)
		});
		const data = await response.json();
		console.log(friendId);
		return new Response(JSON.stringify(data), { status: data.statusCode });
	} catch (error: unknown) {
		console.log(error);
	}
}
