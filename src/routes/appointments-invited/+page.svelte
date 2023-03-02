<script lang="ts">
	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import type { Appointment } from '../../models';
	import { apiCall } from '../../utils/api-call';

	export let data: { appointments: Appointment[] };
	let { appointments }: { appointments: Appointment[] } = data;

	const acceptAppointment = (appointmentId: number) => {
		try {
			apiCall(
				'/api/accept-invitation',
				'post',
				'Accepted',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || '',
				false
			);
		} catch (error) {
			console.log(error);
		}
	};

	const rejectAppointment = (appointmentId: number) => {
		try {
			apiCall(
				'/api/reject-invitation',
				'post',
				'Refused',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || '',
				false
			);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(appointments);
</script>

<!-- cards -->
<div class=" gap-6 grid md:grid-cols-2 xl:grid-cols-3 pb-10">
	{#each appointments as appointment}
		<AppointmentCard
			{appointment}
			rejectAction={rejectAppointment}
			confirmAction={acceptAppointment}
			isAccepting
		/>
	{/each}
</div>
