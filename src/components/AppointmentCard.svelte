<script lang="ts">
	import type { Appointment } from '../models';
	import type { DeletedAppointment } from '../models/appointment';
	import { events } from '../stores/appointments';
	import { apiCall } from '../utils/api-call';

	export let event: Appointment;
	export const handleClick: () => void = () => null;

	const cancelAppointment = async (eventId: number) => {
		// const formData = new FormData(event.target as HTMLFormElement);
		console.log(' delete');

		try {
			const response: DeletedAppointment = await apiCall(
				'/api/delete-appointment',
				'delete',
				'Appuntamento eliminato',
				JSON.stringify({
					appointmentId: eventId
				}),
				sessionStorage.getItem('jwt_token') || ''
			);
			events.update((events) => events.filter((event) => event.id !== response.deletedId));
			//TODO save data in a store so they can be updated by api
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<div class="card w-full   bg-base-300 shadow-xl mx-auto h-64 image-full">
	<button
		class="btn btn-sm btn-circle absolute right-2 top-2 z-50"
		on:click={() => cancelAppointment(event.id)}
	>
		✕
	</button>

	{#if event.image}
		<figure><img src={event.image} alt="card" /></figure>
	{/if}

	<div class="card-body">
		<h2 class="card-title">{event.title}</h2>
		<p class="text-xs text-ellipsis">{event.description}</p>
		<p class="text-xs">{event.start_date}</p>
		<p class="text-xs">{event.end_date}</p>
	</div>
</div>
