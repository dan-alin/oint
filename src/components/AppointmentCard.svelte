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

	const startDate = getDate(appointment.start_date);
	const endDate = getDate(appointment.end_date);

	const startTime = getTime(appointment.start_date);
	const endTime = getTime(appointment.end_date);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a
	href={`/appointments/${appointment.id}`}
	class="card card-side w-full bg-white rounded shadow p-4 h-24 cursor-pointer"
	in:fade
>
	<img
		class="object-cover w-16 h-16"
		src={appointment.image ? appointment.image : '/wp.jpg'}
		alt="Event"
	/>
	<div class="card-body gap-[2px] p-0 pl-4">
		<div class="text-yellow-400 capitalize font-bold text-xs">{startDate} - {startTime}</div>
		<div class="font-bold">{appointment.title.toUpperCase()}</div>
		<div class="text-xs text-ellipsis">{appointment.description}</div>

		<div>
			{#if appointment.locations}
				<ul>
					{#each appointment.locations as loc}
						<li class="text-xs flex gap-1 text-gray-400">
							<Icon icon={Icons.LOCATION_FULL} width="9" height="9" />
							<p class="text-ellipsis whitespace-nowrap overflow-hidden">
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
				class="btn btn-sm  btn-primary btn-outline w-1/2 h-full"
				on:click|stopPropagation={() => declineAction(appointment.id)}
			>
				Rifiuta
			</button>
			<button
				class="btn btn-sm btn-primary w-1/2 h-full"
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
