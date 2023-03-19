import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
    const postData = await request.json();
    const { VITE_API_HOST } = import.meta.env;
    try {
        const response = await fetch(`${VITE_API_HOST}registration/regenerate-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: data.statusCode
        });
    } catch (error: unknown) {
        console.log(error);
    }
}
