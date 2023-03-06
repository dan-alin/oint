import type { RequestEvent } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export async function POST({ request, cookies }: RequestEvent) {
	const user = await request.json();
	try {
		const response = await fetch(`${API_HOST}auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const data = await response.json();
		cookies.set('session', data['access_token'], {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 * 30
		});
		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
