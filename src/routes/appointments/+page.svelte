<script lang="ts">
	import { onMount } from 'svelte';
	import AppointmentsList from '../../components/AppointmentsList.svelte';
	import type { Appointment } from '../../models';
	import type { InvitedOccurrence, Occurrence } from '../../models/appointment';
	import { myAppointmentsStore, invitedAppointmentsStore } from '../../stores/apointments';

	export let data: { myAppointments: Occurrence[]; invitedAppointments: InvitedOccurrence[] };
	let { myAppointments, invitedAppointments } = data;

	let invited = false;

	onMount(async () => {
		myAppointmentsStore.update(() => myAppointments);

		invitedAppointmentsStore.update(() => invitedAppointments);
	});

	console.log($invitedAppointmentsStore);

	const handleChange = () => {
		invited = !invited;
	};
</script>

<div class="sticky top-0 z-50 w-full bg-base-100 p-6">
	<!-- <button class="btn btn-primary " on:click={handleChange}>{invited}</button> -->
	<div class="btn-group w-full">
		<input
			type="radio"
			name="options"
			data-title="I miei appuntamenti"
			class="btn w-1/2 text-xs"
			on:change={handleChange}
			checked={!invited}
		/>
		<input
			type="radio"
			name="options"
			data-title="I miei inviti"
			class="btn w-1/2 text-xs"
			checked={invited}
			on:change={handleChange}
		/>
	</div>
</div>
<AppointmentsList
	appointments={invited ? $invitedAppointmentsStore : $myAppointmentsStore}
	{invited}
/>
