import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const searchText = await request.json();
	const { VITE_API_HOST } = import.meta.env;

	try {
		const response = await fetch(
			`${VITE_API_HOST}users/search?searchText=${searchText.searchText}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: request.headers.get('Authorization') || ''
				}
			}
		);
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: data.statusCode
		});
	} catch (error: unknown) {
		console.log(error);
	}
}
