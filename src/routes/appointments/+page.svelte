<script lang="ts">
	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import type { Appointment } from '../../models';
	import type { DeletedAppointment } from '../../models/appointment';
	import { apiCall } from '../../utils/api-call';

	export let data: { appointments: Appointment[] };
	let { appointments } = data;

	const cancelAppointment = async (appointmentId: number) => {
		try {
			const response: DeletedAppointment = await apiCall(
				'/api/delete-appointment',
				'delete',
				'Appuntamento eliminato',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || ''
			);
			appointments = appointments.filter((event) => event.id !== response.deletedId);
		} catch (error) {}
	};
</script>

<div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pb-10">
	{#each appointments as appointment}
		<AppointmentCard {appointment} action={cancelAppointment} />
	{/each}
</div>
