<script lang="ts">
	import { useQuery, useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/appointments/AppointmentsList.svelte';
	import Icon from '../../components/Icon.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import { Icons } from '../../enums';
	import type { Appointment, InvitedAppointment } from '../../models';
	import type { Notification } from '../../models/notification';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';

	export let data: {
		myAppointments: Appointment[];
		invitedAppointments: InvitedAppointment[];
		notificationsUnread: Notification[];
	};
	let { myAppointments, invitedAppointments, notificationsUnread } = data;

	let notificationsUreadCount = notificationsUnread.length;
	let invited = false;
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
	const queryClient = useQueryClient();
	const queryResultAppointments = useQuery<Appointment[], Error>(
		'/api/appointment-list',
		async () =>
			await apiCall(
				'/api/appointment-list',
				'get',
				'',
				undefined,
				sessionStorage.getItem('jwt_token') || '',
				false
			),
		{ initialData: myAppointments, refetchOnWindowFocus: true, refetchInterval: 20000 }
	);

	const queryResultNotifications = useQuery<Notification[], Error>(
		'/api/notification-uread',
		async () =>
			await apiCall(
				'/api/notification-unread',
				'get',
				'',
				undefined,
				sessionStorage.getItem('jwt_token') || '',
				false
			),
		{ initialData: notificationsUnread, refetchOnWindowFocus: true, refetchInterval: 20000 }
	);

	const handleChange = (e: Event) => {
		activeTab = (e.target as HTMLButtonElement).id;
	};

	onMount(async () => {
		myAppointmentsStore.update(() => myAppointments);

		invitedAppointmentsStore.update(() => invitedAppointments);
	});

	$: if ($queryResultAppointments.data) {
		myAppointmentsStore.update(() => $queryResultAppointments.data as Appointment[]);
	}
	$: if ($queryResultNotifications.data) {
		notificationsUreadCount = $queryResultNotifications.data.length;
	}
</script>

<svelte:head>
	<title>Eventi</title>
	<meta name="description" content="An events list" />
</svelte:head>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-8 ">
		<PageHead firstRow="Ciao" secondRow={$userStore.name} {notificationsUreadCount} />
		<p class="text-sm">
			Dai tornei di calcetto alle mostre d'arte, dalla degustazione di vini ai corsi di cucina...
			Vediamo cosa è in programma questa settimana
		</p>
		<Tabs {tabs} bind:active={activeTab} />
	</div>
</div>
<AppointmentsList invited={activeTab === 'invited-appointments'} />
