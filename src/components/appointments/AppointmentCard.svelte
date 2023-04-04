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
	console.log(appointment);
	const locationSelectionDeadline = parseInt(
		(
			new Date(
				`${getDate(appointment.location_selection_deadline as Date)} ${getTime(
					appointment.location_selection_deadline as Date
				)}`
			).getTime() / 1000
		).toFixed(0)
	);
	const isVotingOpen = () =>
		parseInt((new Date().getTime() / 1000).toFixed(0)) < locationSelectionDeadline;
	const getMostRatedLocation =
		appointment.locations.length > 1
			? appointment.locations.reduce(
					(acc, curr) => (acc.votes || 0 > (curr?.votes_count || 0) ? acc : curr),
					appointment.locations[0]
			  )
			: appointment.locations[0];
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
			{#if !isVotingOpen()}
				<li class="flex items-center gap-1 text-xs text-gray-400">
					<Icon icon={Icons.LOCATION_FULL} size="12" />
					<p class="ellipsis">
						{`${getMostRatedLocation.name} - ${getMostRatedLocation.address}`}
					</p>
				</li>
			{:else}
				<p class="flex">
					<Icon icon={Icons.LOCATION_FULL} size="12" />
					<span class="ellipsis ml-1 text-xs font-bold text-secondary">Work in progressssssss</span>
				</p>
			{/if}
		</div>
	</div>
</a>

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
