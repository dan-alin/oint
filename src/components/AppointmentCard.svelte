<script lang="ts">
	import type { Appointment } from '../models';
	import { apiCall } from '../utils/api-call';
	import Button from './Button.svelte';

	export let event: Appointment;
	export let handleClick: () => void = () => null;

	const onDelete = async (eventId: number) => {
		// const formData = new FormData(event.target as HTMLFormElement);
		console.log(' delete');

		try {
			const response: Appointment = await apiCall(
				'/api/delete-appointment',
				'delete',
				JSON.stringify({
					appointmentId: eventId
				}),
				sessionStorage.getItem('jwt_token') || ''
			);
			console.log(response);

			//TODO save data in a store so they can be updated by api
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card w-full   bg-base-300 shadow-xl mx-auto h-64 image-full"
	on:click={() => onDelete(event.id)}
>
	<div class="btn btn-sm btn-circle absolute right-2 top-2">✕</div>

	{#if event.image}
		<figure><img src={event.image} alt="card" /></figure>
	{/if}

	<div class="card-body">
		<h2 class="card-title">{event.title}</h2>
		<p class="text-xs text-ellipsis">{event.description}</p>
		<p class="text-xs">{event.start_date}</p>
		<p class="text-xs">{event.end_date}</p>

		<!-- <Button class="btn-primary btn-circle btn-xs" text="X" /> -->
	</div>
</div>
