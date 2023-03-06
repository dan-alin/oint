import type { RequestEvent } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export async function POST({ request }: RequestEvent) {
	const searchText = await request.json();

	try {
		const response = await fetch(`${API_HOST}users/search?searchText=${searchText.searchText}`, {
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
