<script lang="ts">
	import type { Appointment } from '../models';

	export let appointment: Appointment;
	export let action: (appointmentId: number) => void;

	const startDate = new Date(appointment.start_date).toLocaleDateString('it-IT', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const endDate = new Date(appointment.end_date).toLocaleDateString('it-IT', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const startTime = new Date(appointment.start_date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});

	const endTime = new Date(appointment.end_date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="card w-80 bg-base-300 shadow-xl mx-auto h-64 image-full">
	<button
		class="btn btn-sm btn-circle absolute right-2 top-2 z-50"
		on:click={() => action(appointment.id)}
	>
		✕
	</button>

	{#if appointment.image}
		<figure><img src={appointment.image} alt="card" /></figure>
	{/if}

	<div class="card-body">
		<h2 class="card-title">{appointment.title}</h2>
		<p class="text-xs text-ellipsis">{appointment.description}</p>
		<div>
			{#if startDate !== endDate}
				<p class="text-xs">
					da {startDate}
				</p>
				<p class="text-xs">a {endDate}</p>
			{:else}
				<p class="text-xs">
					{startDate}
				</p>
			{/if}
		</div>
		{#if appointment.locations}
			<ul>
				{#each appointment.locations as loc}
					<li class="text-xs">{`${loc.name} - ${loc.address}`}</li>
				{/each}
			</ul>
		{/if}

		<div>
			<p class="text-xs">
				ore {startTime}
				{#if endTime} - {endTime} {/if}
			</p>
		</div>
	</div>
</div>
