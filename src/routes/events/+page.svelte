<script lang="ts">
	import { onMount } from 'svelte';
	import { apiCall } from '../../utils/api-call';

	onMount(async () => {
		try {
			const response: { access_token: string } = await apiCall(
				'/api/events',
				'get',
				undefined,
				sessionStorage.getItem('jwt_token') || ''
			);
			console.log(response);
		} catch (error: unknown) {
			console.log(error);
		}
	});
</script>

<svelte:head>
	<title>Events</title>
	<meta name="description" content="A section to find or create events" />
</svelte:head>
<h1>Events</h1>
