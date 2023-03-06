<script lang="ts">
	import { goto } from '$app/navigation';

	import type { DeletedAppointment, Invitation } from '../models';
	import { invitedAppointmentsStore, myAppointmentsStore } from '../stores/apointments';
	import { apiCall } from '../utils/api-call';
	import AppointmentCard from './AppointmentCard.svelte';

	export let invited = false;

	const cancelAppointment = async (appointmentId: number) => {
		const response: DeletedAppointment = await apiCall(
			'/api/delete-appointment',
			'delete',
			'',
			JSON.stringify({
				appointmentId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);

		myAppointmentsStore.update((appointments) =>
			appointments.filter((event) => event.id !== response.appointmentId)
		);
	};

	const acceptAppointment = async (appointmentId: number) => {
		const acceptRes: Invitation = await apiCall(
			'/api/accept-invitation',
			'post',
			'Accepted',
			JSON.stringify({
				appointmentId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		updateInvitationStatusStore(acceptRes);
	};

	const declineAppointment = async (appointmentId: number) => {
		const declineRes: Invitation = await apiCall(
			'/api/reject-invitation',
			'post',
			'Refused',
			JSON.stringify({
				appointmentId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		updateInvitationStatusStore(declineRes);
	};

	const updateInvitationStatusStore = (res: Invitation) => {
		const appointmentsToSet = $invitedAppointmentsStore;

		const appointmentToUpdate = appointmentsToSet.find(
			(occurrence) => occurrence.appointment.id === res.appointment_id
		);

		if (appointmentToUpdate) {
			appointmentToUpdate['invitationStatus'] = res.status;
		}

		invitedAppointmentsStore.update(() => appointmentsToSet);
	};

	const goToDetail = (id: number) => {
		goto(`appointments/${id}`);
	};
</script>

<div class=" gap-6 grid md:grid-cols-2 xl:grid-cols-3 pb-10">
	{#if invited}
		{#each $invitedAppointmentsStore as invitedOccurrence}
			<AppointmentCard
				appointment={invitedOccurrence.appointment}
				inviteMode={invited}
				invitationStatus={invitedOccurrence.invitationStatus}
				declineAction={declineAppointment}
				confirmAction={acceptAppointment}
				action={goToDetail}
			/>
		{/each}
	{:else}
		{#each $myAppointmentsStore as occurrence}
			<AppointmentCard
				appointment={occurrence}
				inviteMode={invited}
				deleteAction={cancelAppointment}
				action={goToDetail}
			/>
		{/each}
	{/if}
</div>
