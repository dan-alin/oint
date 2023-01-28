import { toggleSpinner } from '../stores/spinner';

export const apiCall = async <T>(
	url: string,
	method: 'get' | 'post' | 'put' | 'delete',
	body?: string
): Promise<T> => {
	toggleSpinner.update((toggleSpinner) => true);
	let response;
	try {
		switch (method) {
			case 'get':
				response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				break;
			case 'post':
				response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body
				});
				break;
		}
	} catch (err: unknown) {
		toggleSpinner.update((toggleSpinner) => false);
	}

	if (response?.status === 200) {
		return await response.json();
	}
	toggleSpinner.update((toggleSpinner) => false);
	throw new Error(`Error: ${response?.statusText}`);
};
