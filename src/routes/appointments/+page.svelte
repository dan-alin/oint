<script lang="ts">
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/AppointmentsList.svelte';
	import Icon from '../../components/Icon.svelte';
	import { Icons } from '../../enums';
	import type { Appointment, InvitedAppointment } from '../../models';
	import type { Notification } from '../../models/notification';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';

	export let data: { myAppointments: Appointment[]; invitedAppointments: InvitedAppointment[], notificationsUnread: Notification[] };
	let { myAppointments, invitedAppointments, notificationsUnread } = data;

	let notificationsUreadCount = notificationsUnread.length;
	let invited = false;

	const handleChange = (e: MouseEvent) => {
		if ((e.target as HTMLButtonElement).id === 'my-appointments') {
			invited = false;
		} else {
			invited = true;
		}
	};

	onMount(async () => {
		myAppointmentsStore.update(() => myAppointments);

		invitedAppointmentsStore.update(() => invitedAppointments);
	});
</script>

<svelte:head>
	<title>Eventi</title>
	<meta name="description" content="An events list" />
</svelte:head>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-8 ">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-xl text-gray-400">Ciao</p>
				{#if $userStore}
				<p class="text-2xl font-bold">{$userStore.name}!</p>
				{/if}
			</div>
			<div class="flex h-[50px]  w-[50px] items-center justify-center rounded-full shadow-md relative">
				{#if notificationsUreadCount > 0}
					<div class="badge absolute top-0 left-8">{notificationsUreadCount}</div>
				{/if}
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
