<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Icons } from '../enums';
	import type { Appointment } from '../models';

	import { getDate, getTime } from '../utils/time';
	import Icon from './Icon.svelte';

	export let appointment: Appointment;
	export let inviteMode = false;
	export let invitationStatus: 'declined' | 'accepted' | '' = '';
	// export let deleteAction: (appointmentId: number) => void = () => null;

	export let confirmAction: (appointmentId: number) => void = () => null;
	export let declineAction: (appointmentId: number) => void = () => null;
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
	class="card card-side h-24 w-full cursor-pointer rounded bg-white p-4 shadow rellative"
	in:fade
>

	<img
		class="h-16 w-16 object-cover"
		src={appointment.image ? appointment.image : '/wp.jpg'}
		alt="Event"
	/>
	<div class="card-body gap-[2px] p-0 pl-4">
		<div class="text-xs font-bold capitalize text-yellow-400">{startDate} - {startTime}</div>
		<div class="font-bold">{appointment.title.toUpperCase()}</div>
		<div class="text-ellipsis text-xs">{appointment.description}</div>

		<div>
			{#if appointment.locations}
				<ul>
					{#each appointment.locations as loc}
						<li class="flex gap-1 text-xs text-gray-400">
							<Icon icon={Icons.LOCATION_FULL} width="9" height="9" />
							<p class="overflow-hidden text-ellipsis whitespace-nowrap">
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

{#if inviteMode}
	<div>
		<!-- <div>{invitationStatus}</div> -->
		<div class="flex w-full justify-between gap-2 ">
			<button
				class="btn-outline btn-primary  btn-sm btn h-full w-1/2"
				on:click|stopPropagation={() => declineAction(appointment.id)}
			>
				Rifiuta
			</button>
			<button
				class="btn-primary btn-sm btn h-full w-1/2"
				on:click|stopPropagation={() => confirmAction(appointment.id)}
			>
				Accetta
			</button>
		</div>
		<div class="divider" />
	</div>
{/if}

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
