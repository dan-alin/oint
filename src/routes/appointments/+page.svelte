<script lang="ts">
	import { onMount } from 'svelte';

	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import Button from '../../components/Button.svelte';
	import CreateAppointmentModal from '../../components/CreateAppointmentModal.svelte';
	import type { Appointment } from '../../models';
	import { apiCall } from '../../utils/api-call';

	// export let data: { appointments: any };
	let appointments: any;
	onMount(async () => {
		try {
			const response: { access_token: string } = await apiCall(
				'/api/appointments',
				'get',
				undefined,
				sessionStorage.getItem('jwt_token') || ''
			);
			console.log(response);
			appointments = response;
		} catch (error: unknown) {
			console.log(error);
		}
	});
</script>

<svelte:head>
	<title>Appointments</title>
	<meta name="description" content="A section to find or create events" />
</svelte:head>

<div class="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
	{#if appointments && appointments.length > 0}
		{#each appointments as appointment}
			<AppointmentCard event={appointment} handleClick={() => console.log('clicked')} />
		{/each}
	{:else}
		<div>Nessun evento da visualizzare</div>
	{/if}
</div>

<div
	class="flex justify-center items-center h-16  w-full fixed bottom-0 left-0 bg-base-200 rounded-t-2xl"
>
	<label for="create-appointment-modal" class="btn btn-circle">+</label>
</div>

<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

<CreateAppointmentModal />
