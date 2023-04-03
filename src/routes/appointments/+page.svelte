<script lang="ts">
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/appointments/AppointmentsList.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import type { Appointment, InvitedAppointment } from '../../models';
	import { invitedAppointmentsStore, myAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';

	export let data: {
		myAppointments: Appointment[];
		invitedAppointments: InvitedAppointment[];
		notificationsUnread: Notification[];
	};
	let { myAppointments, invitedAppointments, notificationsUnread } = data;
	console.log(notificationsUnread);

	let notificationsUreadCount = notificationsUnread.length;
	let activeTab: string;

	let tabs = [
		{
			id: 'my-appointments',
			label: 'I tuoi eventi'
		},
		{
			id: 'invited-appointments',
			label: 'I tuoi inviti'
		}
	];

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
		{#if $userStore}
			<PageHead
				firstRow="Ciao"
				secondRow={$userStore.name}
				{notificationsUreadCount}
				showNotification={true}
			/>
		{/if}
		<p class="text-sm">
			Dai tornei di calcetto alle mostre d'arte, dalla degustazione di vini ai corsi di cucina...
			Vediamo cosa è in programma questa settimana
		</p>
		<Tabs {tabs} bind:active={activeTab} />
	</div>
</div>
<AppointmentsList invited={activeTab === 'invited-appointments'} />
