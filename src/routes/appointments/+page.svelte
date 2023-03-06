<script lang="ts">
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/AppointmentsList.svelte';
	import type { Appointment, InvitedAppointment } from '../../models';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';

	export let data: { myAppointments: Appointment[]; invitedAppointments: InvitedAppointment[] };
	let { myAppointments, invitedAppointments } = data;

	let invited = false;

	onMount(async () => {
		myAppointmentsStore.update(() => myAppointments);

		invitedAppointmentsStore.update(() => invitedAppointments);

		console.log($invitedAppointmentsStore);
	});

	const handleChange = (e: MouseEvent) => {
		if ((e.target as HTMLButtonElement).value === 'my-appointments') {
			invited = false;
		} else {
			invited = true;
		}
	};
</script>

<div class="sticky top-0 z-50 w-full bg-base-100 p-6">
	<div class="tabs tabs-boxed w-full">
		<button
			value="my-appointments"
			class="tab w-1/2"
			on:click={handleChange}
			class:tab-active={!invited}>I tuoi eventi</button
		>
		<button
			value="invited-appointments"
			class="tab w-1/2"
			on:click={handleChange}
			class:tab-active={invited}>I tuoi inviti</button
		>
	</div>
</div>
<AppointmentsList {invited} />
