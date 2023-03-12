<script lang="ts">
	import { useQuery, useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/AppointmentsList.svelte';
	import Icon from '../../components/Icon.svelte';
	import { Icons } from '../../enums';
	import type { Appointment, InvitedAppointment } from '../../models';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';

	export let data: { myAppointments: Appointment[]; invitedAppointments: InvitedAppointment[] };
	let { myAppointments, invitedAppointments } = data;

	let invited = false;
	const queryClient = useQueryClient();
	const queryResult = useQuery<Appointment[], Error>(
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

	$: if ($queryResult.data) {
		myAppointmentsStore.update(() => $queryResult.data as Appointment[]);
	}
</script>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
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
