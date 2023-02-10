<script lang="ts">
	import type { Appointment } from '../models';

	export let event: Appointment;
	export let action: (appointmentId: number) => void;
</script>

<div class="card w-full   bg-base-300 shadow-xl mx-auto h-64 image-full">
	<button
		class="btn btn-sm btn-circle absolute right-2 top-2 z-50"
		on:click={() => action(event.id)}
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
