<script lang="ts">
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/AppointmentsList.svelte';
	import Icon from '../../components/Icon.svelte';
	import { Icons } from '../../enums';
	import type { Appointment, InvitedAppointment } from '../../models';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';

	export let data: { myAppointments: Appointment[]; invitedAppointments: InvitedAppointment[] };
	let { myAppointments, invitedAppointments } = data;

	let invited = false;

	onMount(async () => {
		myAppointmentsStore.update(() => myAppointments);

		invitedAppointmentsStore.update(() => invitedAppointments);
	});

	const handleChange = (e: MouseEvent) => {
		if ((e.target as HTMLButtonElement).id === 'my-appointments') {
			invited = false;
		} else {
			invited = true;
		}
	};
</script>

<div class="sticky top-0 z-50 w-full bg-base-100 p-6">
	<div class="flex flex-col gap-8 ">
		<div class="flex justify-between items-center">
			<div>
				<p class="text-xl text-gray-400">Bentornato</p>
				<p class="font-bold text-2xl">{$userStore.name}!</p>
			</div>
			<div class="h-[50px] w-[50px] shadow-md rounded-full flex items-center justify-center">
				<Icon icon={Icons.NOTIFICATION} />
			</div>
		</div>
		<p class="text-sm">
			Dai tornei di calcetto alle mostre d'arte, dalla degustazione di vini ai corsi di cucina...
			Vediamo cosa è in programma questa settimana
		</p>

		<div class="tabs w-full font-bold ">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				id="my-appointments"
				class="tab tab-bordered w-1/2"
				on:click={handleChange}
				class:tab-active={!invited}
				class:text-primary={!invited}
				class:border-primary={!invited}
			>
				I tuoi eventi
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				id="invited-appointments"
				class="tab tab-bordered w-1/2 "
				on:click={handleChange}
				class:tab-active={invited}
				class:text-primary={invited}
				class:border-primary={invited}
			>
				I tuoi inviti
			</div>
		</div>
	</div>
</div>
<AppointmentsList {invited} />

<style>
	.border-primary {
		border-bottom: 3px #2e46ff solid;
	}
</style>
