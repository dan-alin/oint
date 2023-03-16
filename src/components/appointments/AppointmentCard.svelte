<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Icons } from '../../enums';
	import type { Appointment } from '../../models';
	import { getDate, getTime } from '../../utils/time';
	import Icon from '../Icon.svelte';

	export let appointment: Appointment;
	// export let invitationStatus: 'declined' | 'accepted' | '' = '';
	export let deleteAction: (appointmentId: number) => void = () => null;

	const startDate = getDate(appointment.start_date as Date);
	const endDate = getDate(appointment.end_date as Date);

	const startTime = getTime(appointment.start_date as Date);
	const endTime = getTime(appointment.end_date as Date);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <span  on:click={() => deleteAction(appointment.id)}>X</span>-->

<a
	href={`/appointments/${appointment.id}`}
	class="card card-side h-24 w-full cursor-pointer rounded bg-white p-4 shadow"
	in:fade
>
	<img
		class="h-16 w-16 object-cover"
		src={appointment.image ? appointment.image : '/wp.jpg'}
		alt="Event"
	/>
	<div class="card-body w-32 gap-[2px] p-0 pl-4">
		<p class="ellipsis text-xs font-bold capitalize text-yellow-400 ">
			{startDate} - {startTime} 
		</p>
		<p class="ellipsis  font-bold">
			{appointment.title.toUpperCase()}
		</p>
		<p class="ellipsis  text-xs">
			{appointment.description}
		</p>

		<div>
			{#if appointment.locations}
				<ul>
					{#each appointment.locations as loc}
						<li class="flex gap-1 text-xs text-gray-400">
							<Icon icon={Icons.LOCATION_FULL} width="9" height="9" />
							<p class="ellipsis">
								{`${loc.name} - ${loc.address}`}
							</p>
							{#if appointment.locations.length > 1}
								<span class="badge badge-xs">{`${loc.votes_count}`}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</a>

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
